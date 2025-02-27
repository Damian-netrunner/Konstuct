const burgers = document.querySelectorAll('.header__menu-toggle')
burgers.forEach(item =>{
    item.addEventListener('click', function(){
         document.body.classList.toggle('open')
     })
})


