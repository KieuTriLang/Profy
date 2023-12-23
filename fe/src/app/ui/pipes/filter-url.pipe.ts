import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'filterUrl',
  standalone: true,
})
export class FilterUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    const urlRegex =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/;

    const matchedUrl = new RegExp(urlRegex).exec(value);
    if (matchedUrl == null) {
      return value;
    }
    const url = new URL(matchedUrl[0]);
    const partOfHostName = url.hostname.split('.');
    const siteName =
      partOfHostName.length > 2 ? partOfHostName[1] : partOfHostName[0];
    const result = value.replace(
      urlRegex,
      `<a class="link" style="padding: 0.25rem 0.5rem;
  text-decoration: none;
  background-color: rgba(var(--color-text), 0.1);
  border-radius: 0.5rem;
  text-transform: capitalize;
  color: var(--color-text);
  " href="${url.toString()}" target="_blank"
  >${siteName}</a>`
    );
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}
