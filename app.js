var items = ['item 1','item 2','item 3','item 4'];

// myList sınıfından list değişkeni ile eşitledik.
var list = document.querySelector('#myList');


items.forEach(function(item){
    
    createItem(item);

});


// listelenmiş olan itemler üzerine tıklanma halinde -checked- sınıfını ekleme yaptık.
list.addEventListener('click', function(item){

    if(item.target.tagName=='LI'){
        item.target.classList.toggle('checked');
        ToogleDeleteButton();
    }

});

// seçilmiş nesnelerin sayısını alıp sıfırdan büyükse delete all butonunu aktif, değilse pasif duruma geçiriyoruz.
function ToogleDeleteButton(){

    var checkedList = document.querySelectorAll('.list-group-item.checked');

    if(checkedList.length>0){
        document.querySelector('#deleteAll').classList.remove('d-none');
    }else{
        document.querySelector('#deleteAll').classList.add('d-none');
    }

}

// İnput girişinini kontrol edip createItem fonksiyonunu çağırıyor.
document.querySelector('#btnCreate').onclick=function(){

    var item = document.querySelector('#txtItem').value;
    
    if(item === ''){
        alert('Lütfen bir değer giriniz!!!');
        return;
    }

    // btnCreate basıldığı zaman txtItem değeri boşalsın.
    document.querySelector('#txtItem').value = '';
    
    createItem(item);

}

// deleteAll basıldığı zaman checked kontrol et ve gizle.
document.querySelector('#deleteAll').onclick = function(){
    var elements = document.querySelectorAll('.checked');

    elements.forEach(function(item){

        item.style.display = 'none';

    });


}


function createItem(item){
    // items listesindeki elemanları listeleyip atadık
    var li = document.createElement('li');
    var t = document.createTextNode(item);
    li.className = 'list-group-item';
    li.appendChild(t);
    list.appendChild(li);

    //items listesindeki listelenmiş elemanlara span nesnesi ile close ikonu ekledik
    var span = document.createElement('span');
    var text = document.createTextNode('\u00D7');
    span.className = 'close';
    span.appendChild(text);
    li.appendChild(span);

    // span nesnesine tıklanma halinde görünmez hale getirdik.
    span.onclick = function(){
        var li = this.parentElement;
        li.style.display = 'none';
        li.classList.remove('checked');
    }
}