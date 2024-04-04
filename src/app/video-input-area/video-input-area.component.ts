import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface VideoMetaResult {
  videoId: string;
  videoLocation: string;
}

@Component({
  selector: 'app-video-input-area',
  templateUrl: './video-input-area.component.html',
  styleUrl: './video-input-area.component.scss'
})
export class VideoInputAreaComponent{
  @Output() setVideo = new EventEmitter();
  isVideoSelected:boolean = false;

  tagControl = new FormControl(null);
  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    tags: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  })

  getControl(controlname:string):FormControl{
    return this.form.get(controlname) as FormControl;
  }

  getControlValue(controlname:string):string{
    return this.form.get(controlname)?.value
  }

  constructor(private http: HttpClient) { }

  title = 'VideoUpload';
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>
  isThumbnailSelected = false;
  isUpload = false;
  videoFile!: File | null;
  path!: string;
  uploadStatus: number = 0;
  isUploading: boolean = false

  getForm(): FormData {
    return new FormData();
  }

  getVideoFile() {
    return this.videoFile
  }

  setVideoFile(videoFile: File | null) {
    this.videoFile = videoFile;
  }

  setVideoSelected(isVideoSelected: boolean) {
    this.isVideoSelected = isVideoSelected;
  }

  setPath(file: FileList | null): void {
    if (file) {
      this.setVideoSelected(true);
      this.path = URL.createObjectURL(file[0])
      this.setVideoFile(file[0])
    }
    else {
      this.setVideoFile(null)
      this.setVideoSelected(false)
      this.path = ""
    }
  }

  onVideoInput($event: any) {
    this.setPath($event.target.files)
    this.setVideo.emit(this.path)
    this.setVideoSelected(true)
  }

  onVideoDrop($event: DragEvent) {
    $event.preventDefault()
    this.setPath($event.dataTransfer!.files)
    this.setVideo.emit(this.path)
  }

  onVideoCancel() {
    this.setPath(null);
    this.setVideoFile(null);
    this.setVideoSelected(false);
  }

  async asyncPost(url: string, body?: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (err: any) => {
          reject(err);
        }
      })
    })
  }

  async onVideoUpload($event: any) {
    $event.preventDefault();
    
    console.log(this.form)
    if (!this.form.valid){
      return
    }

    if (this.videoFile == null) {
      return;
    }

    if(!this.form.valid){
      console.log("Please enter")
      return
    }
    this.isUpload = true;
    console.log(this.videoFile);

    const CHUNK_SIZE = 1024 * 1024 * 10;
    const FILE_SIZE = this.videoFile.size;
    let CHUNK_NUMBER = 1;
    let start = 0;
    let totalChunk = Math.ceil(FILE_SIZE / CHUNK_SIZE);
    let isRequestError = false;

    let body = {
      "videoTitle": this.getControlValue("title") + new Date().getUTCMilliseconds(),
      "videoDescription": this.getControlValue("description"),
      "tags": this.getControlValue("tags"),
      "totalChunks": totalChunk
    }

    let result:VideoMetaResult | undefined;

    await this.asyncPost("https://localhost:7233/api/VideoUpload", body).then(
      (res) => {
        result = res;
        console.log(res)
      }
    ).catch((err) => {
      isRequestError = true;  
      console.log(err)
    })

    if(isRequestError){
      return
    }

    if (result === undefined){
      return 
    }

    while (start < FILE_SIZE) {
      let chunk = this.videoFile.slice(start, start + CHUNK_SIZE);
      let chunkBlob = new Blob([chunk], { type: this.videoFile.type });
      let chunkFile = new File([chunkBlob],this.videoFile.name)
      const formData = new FormData();
      formData.append('videoId', result.videoId);
      formData.append('videoLocation', result.videoLocation);
      formData.append('videoChunkNumber', CHUNK_NUMBER.toString());
      formData.append('videoChunk', chunkFile);
      await new Promise((resolve, reject) => {
        this.http.post("https://localhost:7233/api/VideoUpload/upload", formData).subscribe(
          {
            next: (res: any) => {
              resolve(res)
            },
            error: (error: any) => {
              reject(error)
            }
          }
        )
      }).then(async (res) => { isRequestError = false;console.log(res) }).catch((err) => { console.log(err); isRequestError = true })
      if (!isRequestError){
        start = start + CHUNK_SIZE
        CHUNK_NUMBER = CHUNK_NUMBER + 1
        this.uploadStatus = CHUNK_SIZE * 100 / FILE_SIZE
        if(this.uploadStatus >= 100){
          this.uploadStatus = 100
        }
      }
      else{
        break
      }
    }
  }
}
