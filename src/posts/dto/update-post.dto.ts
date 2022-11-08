export class updatePostDTO {

  readonly title?: string | null;

  readonly content?: string | null;

  readonly image_url?: string;
}

// 단점... 만약 글자 수 제한이나 이런 걸 지키지 않은 수정이라면?