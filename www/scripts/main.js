
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("open")[0];
let images = document.querySelectorAll('.image');
let infos = document.querySelectorAll('.info');


(function(){
	let URL = "http://148.75.251.185:8888"
	let content = document.querySelector('#name');
	let index = 0;
	let jqueryButton = document.querySelector('.image');
	let mainGrid = document.querySelector('#grid');
	
	mainGrid.addEventListener('click',function(evnt){
		if( evnt.target.classList.contains('thumb')){
			
			$.ajax({
				method: "GET",
				url: URL+'/students/'+evnt.target.dataset.id,
			}).done(function(response){
				document.querySelector('#myModal .modalContent .name').innerText =  response.first_name + " " + response.last_name;
				// document.querySelector('#myModal .modalContent)
				document.querySelector('#myModal .modalContent .email').innerText =  response.email;
				document.querySelector('#myModal .modalContent .exerpt').innerText =  response.excerpt;
				// document.querySelector('#myModal .modalContent .links').innerText =  response.links;
				// document.querySelector('#myModal .modalContent .profile_picture').innerText =  response.image.excerpt;
				modal.style.display = "block";
			});
		}
		
	});

	$.ajax({ 
		url: URL+'/students',
		method: "GET"
	}).done(function(response){
		for (let i=0; i<response.length; i++){
			$.ajax({
				url: URL+'/students/'+response[i].id,
				method: "GET"
			}).done(function(response){
				

				let div= document.createElement('div');
				div.classList.add('image');
				let image = document.createElement('img');
				image.classList.add('thumb');
				image.src = URL + response.profile_picture;
				image.dataset.id = response.id;
				div.appendChild(image);

				mainGrid.appendChild(div);

				// <div class="image"><img src="data/che.jpg"></div> 
			});
		}
	})

})();


//------------------------


// for(let i=0; i < images.length ; i++){
// 		images[i].addEventListener('click',function(){
// 			for(let j=0; j<infos.length; j++){
// 				infos[j].style.display="none";
// 			}
// 			// console.log( this );
// 			console.log("image click!", i, images[i], infos[i])
// 			modal.style.display = "block";
// 			infos[i].style.display = "block";
// 		});
// }


span.addEventListener('click',function(){
 	modal.style.display = "none";
});

span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
