# <span id="top">X Mini Clone with NextJS </span>

<br>
<div align="center">
<img src="https://github.com/ICE0208/x-clone-with-nextjs/assets/46257328/8f32e284-8dc0-454f-b9a5-cfcd40136170">
 <div><a href="https://x-clone-with-nextjs.vercel.app/" target="_blank">🔗 배포 URL</a></div>
  
</div>

<br>

## 무엇을 만들었나? (프로젝트 소개)

X(Twitter)의 미니 클론 버전을 만들었습니다.  
회원가입, 로그인, 게시글 쓰기, 게시글 좋아요 누르기 기능을 만들었습니다.

<br>

## 왜 만들었나? (제작 목적)

노마드 코더 리액트 스터디 3기 졸업과제를 위해 만들었습니다.

<br>

## 언제 만들었나? (제작 기간)

2023.11.06 ~ 2023.11.13

<br>

## 어떻게 만들었나? (대표 개발 기술)

NextJS, TypeScript, TailwindCSS, Prisma를 이용하여 개발하였습니다.  
배포는 Vercel로 하였으며, DB는 Supabase의 postgreSQL를 이용했습니다.

<br>

## 사진들

| <center>/</center>                                                                                                    | <center>/login</center>                                                                                               | <center>ㅤ/joinㅤ</center>                                                                                            |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/ICE0208/x-clone-with-nextjs/assets/46257328/d5e0ade7-0315-443d-9dfb-23dd87ee1ec9"></img> | <img src="https://github.com/ICE0208/x-clone-with-nextjs/assets/46257328/eb5870b7-f513-425e-a81e-254470d0d7fe"></img> | <img src="https://github.com/ICE0208/x-clone-with-nextjs/assets/46257328/e3c28642-5567-4bb8-bb12-13f87aaa8e7f"></img> |
| ==============                                                                                                        | ==============                                                                                                        | ==============                                                                                                        |

| <center>/join/create</center>                                                                                         | <center>/tweets</center>                                                                                              |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/ICE0208/x-clone-with-nextjs/assets/46257328/02122019-79aa-44ed-b923-8926c0adf0c4"></img> | <img src="https://github.com/ICE0208/x-clone-with-nextjs/assets/46257328/705f7b76-11c5-4bac-a6f9-3f486028320a"></img> |
| ==============                                                                                                        | ==============                                                                                                        |

| <center>/tweets/:id</center>                                                                                          | <center>/tweets/upload</center>                                                                                       |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/ICE0208/x-clone-with-nextjs/assets/46257328/e508e281-773d-44a9-b09b-a58e918ca07b"></img> | <img src="https://github.com/ICE0208/x-clone-with-nextjs/assets/46257328/623e46d9-dab2-4f1e-8358-4fd7d25714fa"></img> |
| ==============                                                                                                        | ==============                                                                                                        |

<br>

## 앞으로 추가할 것들

- 본인 글 수정, 삭제 기능
- 댓글 기능
- 본인 닉네임, 비밀번호 변경 기능
- 탈퇴 기능

## 실행 해보기

- 최상위 경로에 .env.local 파일 생성 후 아래 표 참고해서 채우기

| KEY                 | VALUE's description             |
| ------------------- | ------------------------------- |
| POSTGRES_PRISMA_URL | your sql url (maybe postgreSQL) |
| COOKIE_NAME         | your cookie name                |
| COOKIE_PASSWORD     | your cookie password            |

- `npm run prismaDevPush` : Prisma 모델을 데이터베이스에 적용하여 개발 환경을 업데이트합니다. (모델을 변경했으면 실행해줍시다.)
- `npx prisma generate` : Prisma 모델을 기반으로 코드를 자동 생성하여 개발 생산성을 향상시킵니다. (schema.prisma 파일을 변경하면 실행해줍시다.)
- `npm run prismaStudio` : Prisma Studio 도구를 실행하는 명령어로, 데이터베이스 시각화와 효율적인 데이터 조작을 제공하여 개발 및 디버깅을 용이하게 합니다. (Not Required)
- `npm run dev` : Next.js 애플리케이션을 개발 서버 모드로 실행합니다
