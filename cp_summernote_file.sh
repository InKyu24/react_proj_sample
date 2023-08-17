# package.json에 있는 패키지들을 설치
npm i -force

# summernote.js.map 파일을 node_modules/react-summernote/dist 안에 복사
cp summernote.js.map ./node_modules/react-summernote/dist/summernote.js.map

# react 실행
npm start