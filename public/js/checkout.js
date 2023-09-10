

function copytoclip(t) {

    navigator.clipboard.writeText(t);
    document.getElementById("ccpy").setAttribute("title", "Copied to clipboard");
    document.getElementById("rem123").style.transform = "translateY(-500px)";
    setTimeout(()=>{document.getElementById("rem123").style.transform = "translateY(500px)";
  }, 3200)
  } 


function check() {
    return document.getElementById("mycheck").checked;
}

function getVal() {
  let val = document.getElementById('promo').value;
  console.log(val);
  if (val == "") {
    return true;
  }
    return false;
}

function togglewarning(){
  document.getElementById("warn2").style.display = "none";
      document.getElementById("warn1").style.display = "none";
      document.getElementById("good90").style.display = "none";
      document.getElementById("promo_input").style.marginTop = "1rem"
      document.getElementById("abracadbra").style.marginBottom = "0.3rem"
}


function confrm(){
  if(check() && getVal()){
     togglewarning()
      document.getElementById("warn1").style.display = "block";
      return false;
  }

  let str = document.getElementById('promo').value;
  const reg = /^[a-zA-Z0-9]{6,}$/
  let isValid = reg.test(str);
  console.log(isValid); 
  if(!isValid && check()) {
    togglewarning()
      document.getElementById("warn2").style.display = "block";
      return false;
  }

  if(check()){
  togglewarning()
  document.getElementById("good90").style.display = "block"
}}

function piiche(){
  window.history.back();
}