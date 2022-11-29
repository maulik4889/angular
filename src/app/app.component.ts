

import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
declare var gtag:any;
declare let fbq: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  previousUrl: string | undefined;

  constructor(
    private renderer: Renderer2,
    private router: Router,
  ) {

    //this.addGAScript();
    const navEndEvents = router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe(event => {
      
      gtag('event', 'page_view', {
        page_path: event.urlAfterRedirects
     });
      fbq('track', 'PageView');

     });

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (this.previousUrl) {
            // this.renderer.removeClass(document.body, this.previousUrl);
            this.renderer.removeAttribute(document.body, 'id');
          }
          const currentUrlSlug = event.url.slice(1);
          if (currentUrlSlug) {
            // this.renderer.addClass(document.body, currentUrlSlug);
            this.renderer.setAttribute(document.body, 'id', currentUrlSlug);
          }
          this.previousUrl = currentUrlSlug;
        }
      });
  }
  ngOnInit() {

    
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    // let cc = window as any;
    // cc.cookieconsent.initialise({
    //   palette: {
    //     popup: {
    //       background: "#ECEAEA",
    //       text: "black"
    //     },
    //     button: {
    //       background: "#FF5700",
    //       text: "#FFFFFF"
    //     }
    //   },
    //   theme: "classic",
    //   content: {
    //     message: "We use cookies for security, to optimise your browsing experience and anonymously analyse site traffic. Accepting necessary cookies is required to provide you with a minimum level of service. ",
    //     dismiss: 'Got it',
    //     link: 'Read Cookie policy',
    //     href: 'https://matutto.com/privacypolicy'
    //   }
    // });

  }

    /** Add Google Analytics Script Dynamically */
    addGAScript() {
      let gtagScript: HTMLScriptElement = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + 'UA-172000384-1';
      document.head.prepend(gtagScript);
      /** Disable automatic page view hit to fix duplicate page view count  **/
      gtag('config', 'UA-172000384-1', { send_page_view: false });
  }
}

