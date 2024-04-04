import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    this.video = this.videoElement.nativeElement
    this.video.style.width = "100%"
    this.video.style.backgroundColor = "black"
    this.video.controls = true;
  }

  isVideoSelected: boolean = false;
  videoUrl: string | null = null;
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>
  video!: HTMLVideoElement;

  setVideo($event: any){
    this.videoUrl = $event
    console.log(this.videoUrl)
    this.onVideoSelected()
  }

  onVideoSelected() {
    if(this.videoUrl === null){
      return
    }
    this.video.src = this.videoUrl
  }
}
