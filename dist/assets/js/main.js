const header = document.querySelector('.header');


window.addEventListener('scroll', function(){
    if ( window.pageYOffset > 0 ){
        header.classList.add('scrolled');
    } else{
        header.classList.remove('scrolled');
    }
})


const hamburgers = document.querySelectorAll('.hamburger');
const mobMenu = document.querySelector('.mob-menu');



hamburgers.forEach( h => {
    h.addEventListener('click', function(){

        if ( !this.classList.contains('open') ){
            hamburgers.forEach( hi => {

                let heightScreen = document.documentElement.clientHeight;

                let headerTopHeight = document.querySelector('.header__top').offsetHeight;
                let headerCenterHeight = document.querySelector('.header__center').offsetHeight;

                
                let maxHeight = heightScreen - (headerTopHeight + headerCenterHeight);

                mobMenu.style.maxHeight = maxHeight + 'px';
                mobMenu.style.height = maxHeight + 'px';
                document.body.classList.add('no-scroll');
                hi.classList.add('open');
            })
        } else{
            hamburgers.forEach( hi => {
                hi.classList.remove('open');
                mobMenu.style.maxHeight = 0 + 'px';
                mobMenu.style.height = 0 + 'px';
                document.body.classList.remove('no-scroll');
            })
        }

        
    })
} )


const parentMobMenuItems = document.querySelectorAll('.mm-parent__item.has-child');

parentMobMenuItems.forEach(item => {
    item.addEventListener('click', function(){
        if ( !this.classList.contains('open') ){
           

            let childContainer = this.querySelector('.mm-child-container');
            let childMenuHeight = this.querySelector('.mm-child').offsetHeight;
            let self = this;
            function StopChildTransition(){
                childContainer.style.height = 'auto';
                childContainer.style.overflow = 'initial';
                childContainer.removeEventListener('transitionend', StopChildTransition);
                
                console.log('deleted');
            }
            this.classList.add('open');
            childContainer.addEventListener('transitionend', StopChildTransition)
            childContainer.style.height = childMenuHeight + 'px';            

        } else{
            this.classList.remove('open');
            let childContainer = this.querySelector('.mm-child-container');
            let childMenuHeight = this.querySelector('.mm-child').offsetHeight;
            childContainer.style.height = childMenuHeight + 'px';
            childContainer.style.overflow = 'hidden';
            setTimeout(()=>{
                childContainer.style.height = 0 + 'px';
            }, 20);
            
        }
    })
});


const childMobMenuItems = document.querySelectorAll('.mm-child__item.has-child');

childMobMenuItems.forEach( (item) => {
    item.addEventListener('click', function(event){
        event.stopPropagation();

        if ( !this.classList.contains('open') ){
            this.classList.add('open');

            let subChildContainer = this.querySelector('.mm-subchild-container');
            let subChildContainerInner = this.querySelector('.mm-subchild-container__inner');

            subChildContainer.style.height = subChildContainerInner.offsetHeight + 'px';
        } else{
            this.classList.remove('open');
            let subChildContainer = this.querySelector('.mm-subchild-container');
            subChildContainer.style.height = '0px';
        }
    })
})


let options = {
    zIndex: 1000, 
    //background: 'rgba(12, 130, 121, 0.5)', 
    displayModalContainer: 'flex', 
    displayModal: 'block', 
  
    closeSelectors: ['.feedback-modal__close'], 
    closeModalOnFogClick: true, 
    showModalAnimation: 'fadeInBottom', 
    closeModalAnimation: 'fadeOutTop',  
    showModalDuration: '300ms',
    closeModalDuration: '500ms',
  
    showFogAnimation: 'fadeIn',
    closeFogAnimation: 'fadeOut',
    showFogDuration: '300ms',
    closeFogDuration: '500ms',
    documentCanScroll: false, 
  
    // 'modal-first' - сначала скрывается модальное окно - затем туман
    // 'along' - анимации закрытия тумана и окна происходят параллельно
    closeMode: 'modal-first',
    
    
    
  
  }


let callFeedbackModalBtns = document.querySelectorAll('button[data-modal]');
let modal;

callFeedbackModalBtns.forEach( btn => {
    btn.addEventListener('click', function(){
        let targetModal = '.' + this.getAttribute('data-modal');
        

        modal = new easyModal(targetModal, options);
    })
} )


const omFilltersBtn = document.querySelectorAll('.om-filters__btn');
const masters = document.querySelectorAll('.master');


if ( omFilltersBtn.length > 0 ){
    let omFilltersBtnActive = document.querySelector('.om-filters__btn.active');
    let activeFilter = omFilltersBtnActive.getAttribute('data-filter-target');

    masters.forEach( item => {
        if ( item.getAttribute('data-filter') ==  activeFilter) {
            item.style.display = 'flex';
        }
    } )


    omFilltersBtn.forEach( btn => {
        btn.addEventListener('click', function(event){
            if ( !this.classList.contains('active') ){
                let omFilltersBtnActive = document.querySelector('.om-filters__btn.active');
                omFilltersBtnActive.classList.remove('active');
                this.classList.add('active');

                let newActive = this.getAttribute('data-filter-target');

                let mastersActive = document.querySelectorAll('.master[style]');
                mastersActive.forEach( ma => {
                    ma.removeAttribute('style');
                } )

                masters.forEach( (m, i) => {
                    if ( m.getAttribute('data-filter') == newActive ){
                        if ( i > 0) {
                            setTimeout( ()=>{
                                m.style.display = 'flex';
                            }, 200 )
                        } else{
                            m.style.display = 'flex';
                        }
                        
                    }
                } )
            }
        })
    } )
}

$("input[name='phone']").mask("+7(999) 999-9999", {placeholder:"-"});


const ccheckboxes = document.querySelectorAll('.custom-checkbox');

ccheckboxes.forEach( cb => {
    cb.addEventListener( 'change', function(){
        const form = this.closest('form');
        const btn = form.querySelector('button');

        if ( this.checked ) {
            btn.removeAttribute('disabled');
        } else{
            btn.setAttribute('disabled', 'disabled');
        }
    } )
} )

