window.onload = function() {
	crear_select();
}

function isMobileDevice() {
	return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};


let li = new Array();

function crear_select() {
	let div_cont_select = document.querySelectorAll("[data-mate-select='active']");
	let select_ = '';
	for (let e = 0; e < div_cont_select.length; e++) {
		div_cont_select[e].setAttribute('data-indx-select', e);
		div_cont_select[e].setAttribute('data-selec-open', 'false');
		let ul_cont = document.querySelectorAll("[data-indx-select='" + e + "'] > .cont_list_select_mate > ul");
		select_ = document.querySelectorAll("[data-indx-select='" + e + "'] >select")[0];
		if (isMobileDevice()) {
			select_.addEventListener('change', function() {
				_select_option(select_.selectedIndex, e);
			});
		}
		let select_optiones = select_.options;
		document.querySelectorAll("[data-indx-select='" + e + "']  > .selecionado_opcion ")[0].setAttribute('data-n-select', e);
		document.querySelectorAll("[data-indx-select='" + e + "']  > .icon_select_mate ")[0].setAttribute('data-n-select', e);
		for (let i = 0; i < select_optiones.length; i++) {
			li[i] = document.createElement('li');
			if (select_optiones[i].selected == true || select_.letue == select_optiones[i].innerHTML) {
				li[i].className = 'active';
				document.querySelector("[data-indx-select='" + e + "']  > .selecionado_opcion ").innerHTML = select_optiones[i].innerHTML;
			};
			li[i].setAttribute('data-index', i);
			li[i].setAttribute('data-selec-index', e);

			li[i].addEventListener('click', function() {
				_select_option(this.getAttribute('data-index'), this.getAttribute('data-selec-index'));
			});

			li[i].innerHTML = select_optiones[i].innerHTML;
			ul_cont[0].appendChild(li[i]);

		};
	};
}



let cont_slc = 0;

function open_select(idx) {
	let idx1 = idx.getAttribute('data-n-select');
	let ul_cont_li = document.querySelectorAll("[data-indx-select='" + idx1 + "'] .cont_select_int > li");
	let hg = 0;
	let slect_open = document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].getAttribute('data-selec-open');
	let slect_element_open = document.querySelectorAll("[data-indx-select='" + idx1 + "'] select")[0];
	if (isMobileDevice()) {
		if (window.document.createEvent) { // All
			let evt = window.document.createEvent("MouseEvents");
			evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			slect_element_open.dispatchEvent(evt);
		} else if (slect_element_open.fireEvent) { // IE
			slect_element_open.fireEvent("onmousedown");
		} else {
			slect_element_open.click();
		}
	} else {


		for (let i = 0; i < ul_cont_li.length; i++) {
			hg += ul_cont_li[i].offsetHeight;
		};
		if (slect_open == 'false') {
			document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open', 'true');
			document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style.height = hg + "px";
			document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform = 'rotate(180deg)';
		} else {
			document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open', 'false');
			document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform = 'rotate(0deg)';
			document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
		}
	}

}

function salir_select(indx) {
	let select_ = document.querySelectorAll("[data-indx-select='" + indx + "'] > select")[0];
	document.querySelectorAll("[data-indx-select='" + indx + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
	document.querySelector("[data-indx-select='" + indx + "'] > .icon_select_mate").style.transform = 'rotate(0deg)';
	document.querySelectorAll("[data-indx-select='" + indx + "']")[0].setAttribute('data-selec-open', 'false');
}


function _select_option(indx, selc) {
	if (isMobileDevice()) {
		selc = selc - 1;
	}
	let select_ = document.querySelectorAll("[data-indx-select='" + selc + "'] > select")[0];

	let li_s = document.querySelectorAll("[data-indx-select='" + selc + "'] .cont_select_int > li");
	let p_act = document.querySelectorAll("[data-indx-select='" + selc + "'] > .selecionado_opcion")[0].innerHTML = li_s[indx].innerHTML;
	let select_optiones = document.querySelectorAll("[data-indx-select='" + selc + "'] > select > option");
	for (let i = 0; i < li_s.length; i++) {
		if (li_s[i].className == 'active') {
			li_s[i].className = '';
		};
		li_s[indx].className = 'active';

	};
	select_optiones[indx].selected = true;
	select_.selectedIndex = indx;
	select_.onchange();
	salir_select(selc);
}

let concession = document.getElementById("temperature-letue");
document.getElementById("temperature").addEventListener('click', function() {        
    concession.style.display = (this.checked)? "flex" : "none";
});