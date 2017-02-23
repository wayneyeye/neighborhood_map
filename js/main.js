//animations
//pops sidebar
function popSideBar(){
	var sidebar = document.getElementById('side-bar');
	sidebar.style.display='block';
	var search = document.getElementById('toggle-menu')
	search.style.display='none';
	var title = document.getElementById('title')
	title.style.opacity=0;

}
//hides sidebar
function hideSideBar(){
	var sidebar = document.getElementById('side-bar');
	sidebar.style.display='none';
	var search = document.getElementById('toggle-menu')
	search.style.display='block';
	var title = document.getElementById('title')
	title.style.opacity=1;
}