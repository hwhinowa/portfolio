'use strict';

document.addEventListener('DOMContentLoaded', function(){
    // 페이지 로드완료시 시작점으로 스크롤 이동
    setTimeout(function(){
        window.scrollTo(0,0);
    },2000);
});

// 선택자 객체 지정 함수
function $(selector){
	let $el = document.querySelectorAll(selector),
		count = $el.length;

	if(count > 1){
		return $el;
	}else if(count == 1){
		return $el[0];
	}else{
		return;
	}
};

// WORK메뉴 버튼 클릭 이벤트
const work=()=>{
    let body = $('body');
    let $box = $('.work_empty');
    let $wrap = $('.wrap');

    $box.classList.add('active');

    setTimeout(function(){
        $wrap.classList.add('active');
        body.classList.add('active');
    }, 500);
    setTimeout(function(){
        location.href = '/html/works.html';
    }, 1500);
}

// 메뉴 마우스오버 이벤트
let $menu = $('.menu');

const back_modify=(event)=>{
    let box, elem, style;

    box = event.target.classList.contains('menu') ? event.target : event.target.closest('button');
    elem = box.classList.contains('about') ? 'left' : 'right';

    if(event.type === 'mouseover'){
        style = true;
    }else if(event.type === 'mouseout'){
        style = false;
    }

    style_active(elem, style);
};

const style_active=(back, active)=>{
    let $target = $('.bg.'+back);
    if(active){
        $target.classList.add('hover');
    }else{
        $target.classList.remove('hover');
    }
};

for(let i = 0; i < $menu.length; i++){
    let temp = $menu[i];
    temp.onmouseover = temp.onmouseout = back_modify;
}

// 스크롤 이벤트
window.addEventListener('scroll', function(e){
    let scroll_y = window.scrollY;
    let $target_bg = $('.bg');
    let $target_hello = $('.text_box');
    let $target_text = $('.text');

    for(let i = 0; i < $target_bg.length; i++){
        let temp = $target_bg[i];
        if(scroll_y >= 100 && $target_bg.length !== 0){
            temp.classList.add('con');
            $target_hello.classList.add('con');
            $target_text.classList.add('show');
        }else{
            temp.classList.remove('con');
            $target_hello.classList.remove('con');
            $target_text.classList.remove('show');
        }
    }
});

// 소개페이지 패럴랙스 스크롤
let $about = $('.about_container');
$about.addEventListener('scroll', function(){
    let about_test = $about.scrollTop,
        width = (window.innerWidth || document.documentElement.clientWidth),
        $box = $('.two');
    
    if(about_test > 0 && about_test < 500){
        if(width > 1000){
            $box.style.top = (400 - about_test / 2) + 'px';
        }else{
            $box.style.top = (288 - about_test / 2) + 'px';
        }
    }
});

// ABOUT 메뉴 OPEN/CLOSE
let $elem = $('main');
let $header = $('header');

const menu_open=()=>{
    $elem.classList.add('menu');
    $header.classList.add('menu');
}

const menu_close=()=>{
    $elem.classList.remove('menu');
    $header.classList.remove('menu');
}