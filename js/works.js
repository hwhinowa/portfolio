'use strict';

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

// 모든 classname 삭제
const remove_all_class = (elem) => {
    if (elem && elem.classList) {
        for (let i = 0; i < elem.classList.length; i++) {
            let temp = elem.classList[i];
            elem.classList.remove(temp);
        }
    }
}

// 스크롤바 스타일 변경 함수
const move=(e)=>{
    let $box = $('#well'),
        $buttons = $('.fix_box3 > button'),
        $bar = $('.scroll_view span:nth-of-type(8)');

    for(let i = 0; i <= $buttons.length; i++){
        let temp = $buttons[i];
        if(temp === e){
            $box.style.transform = 'translateY(' + (i * (-100)) + 'vh)';
            remove_all_class($bar);
            let will_add_class = 'item' + (i + 1);
            if (i !== 0) {
                $bar.classList.add(will_add_class);
            }
        }
    }
}

// class 토글 함수
const toggle_class=(elem, name)=>{
    if(elem && elem.classList){
        if(elem.classList.contains(name)){
            elem.classList.remove(name);
        }else{
            elem.classList.add(name);
        }
    }
}

// 인덱스 OPEN/CLOSE
const view_index=(btn, mobile)=>{
    let mobile_check = mobile === undefined ? false : mobile,
        $util_box = $('.introduce_box .util'),
        $box = $('.fix_box3');

    toggle_class($box, 'active');
    if(mobile_check){
        let btns = $('.introduce_box .util button:nth-of-type(2)');
        for(let i = 0; i < btns.length; i++){
            let temp = btns[i];
            toggle_class(temp, 'active');
            if(temp && temp.classList){
                if(temp.classList.contains('active')){
                    temp.innerHTML = 'Close';
                    $util_box.forEach(function(elem){
                        elem.classList.add('active');
                    });
                }else{
                    temp.innerHTML = 'Index';
                    $util_box.forEach(function(elem){
                        elem.classList.remove('active');
                    });
                }
            }
        }
    }else{
        toggle_class(btn, 'active');
        if(btn && btn.classList){
            if(btn.classList.contains('active')){
                btn.innerHTML = 'Close';
            }else{
                btn.innerHTML = 'Index';
            }
        }
    }
}

// fullpage 스크롤 이동 함수
let scroll_direction, hold = false,
    panels = $('.panel').length;

function scroll_y(obj) {
    let slength, plength, pan,
        step = 100,
        vh = window.innerHeight / 100,
        vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
    if ((this !== undefined && this.id === 'well') || (obj !== undefined && obj.id === 'well')) {
        pan = this || obj;
        plength = parseInt(pan.offsetHeight / vh);
    }
    if (pan === undefined) {
        return;
    }
    plength = plength || parseInt(pan.offsetHeight / vmin);
    slength = parseInt(pan.style.transform.replace('translateY(', ''));
    if (scroll_direction === 'up' && Math.abs(slength) < (plength - plength / panels)) {
        slength = slength - step;
    } else if (scroll_direction === 'down' && slength < 0) {
        slength = slength + step;
    } else if (scroll_direction === 'top') {
        slength = 0;
    }

    if (hold === false) {
        hold = true;
        pan.style.transform = 'translateY(' + slength + 'vh)';

        let $bar = $('.scroll_view span:nth-of-type(8)');

        remove_all_class($bar);
        let will_add_class = 'item' + ((slength * (-1) / 100) + 1);
        if (slength !== 0) {
            $bar.classList.add(will_add_class);
        }

        setTimeout(function () {
            hold = false;
        }, 1000);
    }
}

function swipe(obj) {
    var swipe_direction, sX, sY, dX, dY, elT, stT,
        threshold = 100,
        slack = 50,
        alT = 500;
    obj.addEventListener('touchstart', function (e) {
        var tchs = e.changedTouches[0];
        swipe_direction = 'none';
        sX = tchs.pageX;
        sY = tchs.pageY;
        stT = new Date().getTime();
    }, false);

    obj.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);

    obj.addEventListener('touchend', function (e) {
        var tchs = e.changedTouches[0];
        dX = tchs.pageX - sX;
        dY = tchs.pageY - sY;
        elT = new Date().getTime() - stT;
        if (elT <= alT) {
            if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
                swipe_direction = (dX < 0) ? 'left' : 'right';
            } else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
                swipe_direction = (dY < 0) ? 'up' : 'down';
            }
            if (obj.id === 'well') {
                if (swipe_direction === 'up') {
                    scroll_direction = swipe_direction;
                    scroll_y(obj);
                } else if (swipe_direction === 'down' && obj.style.transform !== 'translateY(0)') {
                    scroll_direction = swipe_direction;
                    scroll_y(obj);
                }
                e.stopPropagation();
            }
        }
    }, false);
}

let well = document.getElementById('well');
well.style.transform = 'translateY(0)';
well.addEventListener('wheel', function (e) {
    if (e.deltaY < 0) {
        scroll_direction = 'down';
    }
    if (e.deltaY > 0) {
        scroll_direction = 'up';
    }
    e.stopPropagation();
});
well.addEventListener('wheel', scroll_y);
swipe(well);

let $tops = $('.introduce_top');
for (let i = 0; i < $tops.length; i++) {
    $tops[i].addEventListener('click', function () {
        scroll_direction = 'top';
        scroll_y(well);
    });
}