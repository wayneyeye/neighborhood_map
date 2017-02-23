//animations
//pops sidebar
function popSideBar(){
	var sidebar = document.getElementById('side-bar');
	sidebar.style.display='block';
	var search = document.getElementById('toggle-menu')
	search.style.display='none';
}
//hides sidebar
function hideSideBar(){
	var sidebar = document.getElementById('side-bar');
	sidebar.style.display='none';
	var search = document.getElementById('toggle-menu')
	search.style.display='block';
}