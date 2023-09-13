

function AddToWishlist(courseid){

    document.getElementById('wlbutton').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <span class="">Adding To WL...</span>`
    
    fetch(`http://localhost:8000/add-to-wl/${courseid}`, {
    Method: 'GET',
    Headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
    }).then((res) => {
        
        if(res.status == 200){
            let buttn = document.getElementById('wlbutton')
            buttn.innerHTML = ""
            buttn.innerHTML = "Added To Wishlist!"
            buttn.classList.remove('btn-dark')
            buttn.classList.add('btn-success')
            }

            
        // if(res.status == 200){
        //     let buttn = document.getElementById('wlbutton')
        //     buttn.innerHTML = ""
        //     buttn.innerHTML = "Already in Wishlist!"
        //     buttn.classList.remove('btn-dark')
        //     buttn.classList.add('btn-success')
        //     }
    })


}