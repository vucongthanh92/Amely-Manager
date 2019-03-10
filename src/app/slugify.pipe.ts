import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify'
})
export class SlugifyPipe implements PipeTransform {
  transform(input: string): string {
    return input.toString().toLowerCase()
      .replace(/\s+/g, '-').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '')
      .replace(new RegExp('à', 'g'), 'a').replace(new RegExp('á', 'g'), 'a').replace(new RegExp('ả', 'g'), 'a')
      .replace(new RegExp('ã', 'g'), 'a').replace(new RegExp('ạ', 'g'), 'a').replace(new RegExp('ă', 'g'), 'a')
      .replace(new RegExp('ắ', 'g'), 'a').replace(new RegExp('ằ', 'g'), 'a').replace(new RegExp('ắ', 'g'), 'a')
      .replace(new RegExp('ẵ', 'g'), 'a').replace(new RegExp('ặ', 'g'), 'a').replace(new RegExp('â', 'g'), 'a')
      .replace(new RegExp('ấ', 'g'), 'a').replace(new RegExp('ầ', 'g'), 'a').replace(new RegExp('ẩ', 'g'), 'a')
      .replace(new RegExp('ẫ', 'g'), 'a').replace(new RegExp('ậ', 'g'), 'a')
      .replace(new RegExp('è', 'g'), 'e').replace(new RegExp('é', 'g'), 'e').replace(new RegExp('ẻ', 'g'), 'e')
      .replace(new RegExp('ẽ', 'g'), 'e').replace(new RegExp('ẹ', 'g'), 'e').replace(new RegExp('ê', 'g'), 'e')
      .replace(new RegExp('ế', 'g'), 'e').replace(new RegExp('ề', 'g'), 'e').replace(new RegExp('ể', 'g'), 'e')
      .replace(new RegExp('ễ', 'g'), 'e').replace(new RegExp('ệ', 'g'), 'e')
      .replace(new RegExp('í', 'g'), 'i').replace(new RegExp('ì', 'g'), 'i').replace(new RegExp('ỉ', 'g'), 'i')
      .replace(new RegExp('ĩ', 'g'), 'i').replace(new RegExp('ị', 'g'), 'i')
      .replace(new RegExp('ó', 'g'), 'o').replace(new RegExp('ò', 'g'), 'o').replace(new RegExp('ỏ', 'g'), 'o')
      .replace(new RegExp('õ', 'g'), 'o').replace(new RegExp('ọ', 'g'), 'o').replace(new RegExp('ô', 'g'), 'o')
      .replace(new RegExp('ố', 'g'), 'o').replace(new RegExp('ồ', 'g'), 'o').replace(new RegExp('ổ', 'g'), 'o')
      .replace(new RegExp('ỗ', 'g'), 'o').replace(new RegExp('ộ', 'g'), 'o').replace(new RegExp('ơ', 'g'), 'o')
      .replace(new RegExp('ớ', 'g'), 'o').replace(new RegExp('ờ', 'g'), 'o').replace(new RegExp('ở', 'g'), 'o')
      .replace(new RegExp('ỡ', 'g'), 'o').replace(new RegExp('ợ', 'g'), 'o')
      .replace(new RegExp('ú', 'g'), 'u').replace(new RegExp('ù', 'g'), 'u').replace(new RegExp('ủ', 'g'), 'u')
      .replace(new RegExp('ũ', 'g'), 'u').replace(new RegExp('ụ', 'g'), 'u').replace(new RegExp('ư', 'g'), 'u')
      .replace(new RegExp('ứ', 'g'), 'u').replace(new RegExp('ừ', 'g'), 'u').replace(new RegExp('ử', 'g'), 'u')
      .replace(new RegExp('ữ', 'g'), 'u').replace(new RegExp('ự', 'g'), 'u')
      .replace(new RegExp('ý', 'g'), 'y').replace(new RegExp('ỳ', 'g'), 'y').replace(new RegExp('ỷ', 'g'), 'y')
      .replace(new RegExp('ỹ', 'g'), 'y').replace(new RegExp('ỵ', 'g'), 'y').replace(new RegExp('đ', 'g'), 'd')
      .replace(/[^a-zA-Z0-9-. ]/g, '');
  }
}
