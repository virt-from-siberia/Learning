import { Component, OnInit } from "@angular/core";

@Component({
  // selector: '[app-servers]',
  // selector: '.app-servers',
  selector: "app-servers",
  // template: ` <app-server></app-server>
  //   <app-server></app-server>`,
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.css"],
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  serverCreationStatus: string = "No server was created";
  serverName: string = "test";

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {}

  onCreateServer(): void {
    this.serverCreationStatus =
      "server was created, Name is " + this.serverName;
  }

  onUpdateServerName(event: Event): void {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}