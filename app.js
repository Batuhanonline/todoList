// localStroge dan verileri alıp items değişkeninin içine ayrıştırıldı.
var localItems = [localStorage.getItem('todo')]
var items = JSON.parse(localItems);

// myList sınıfından list değişkeni ile eşitledik.
var list = document.querySelector('#myList');
// Cookies deki veriler çıktı verildi.
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
    // btnCreate basıldığı zaman txtItem değeri boşalsın.
    document.querySelector('#txtItem').value = '';
    if(item === ''){
        alert('Lütfen bir değer giriniz!!!');
        return;
    }
    // item diziye ekleniyor.
    items.push(item);
    createItem(item);
    updateItems();
}

// deleteAll basıldığı zaman checked kontrol et, gizle ve sil.
document.querySelector('#deleteAll').onclick = function(){
    var elements = document.querySelectorAll('.checked');
    elements.forEach(function(item){

        item.style.display = 'none'; 
        deleteItem(item.innerHTML);
        item.classList.remove('checked');

    });
    ToogleDeleteButton();
}

function createItem(item){
    // items listesindeki elemanları listeleyip atadık
    var li = document.createElement('li');
    var t = document.createTextNode(item);
    li.className = 'list-group-item';
    li.appendChild(t);
    list.appendChild(li);
    
    //items listesindeki listelenmiş elemanlara span nesnesi ile close butonu ekledik
    var span = document.createElement('span');
    var text = document.createTextNode('\u00D7');
    span.className = 'close btn btn-danger';
    span.appendChild(text);
    li.appendChild(span);

    //items listesindeki listelenmiş elemanlara span nesnesi ile edit butonu ekledik
    var editSpan = document.createElement('span');
    var editText = document.createTextNode('<@>');
    editSpan.className = 'edit btn btn-warning';
    editSpan.appendChild(editText);
    li.appendChild(editSpan);


    ////////////////////////////////
    var editInput = document.createElement('input');
    var editAdd = document.createElement('button');
    var editAddText = document.createTextNode('>>>');
    editAdd.className = 'editAdd btn btn-success';
    editInput.id = 'editTxt';
    editInput.type = 'text';
    editInput.className = 'form-control';
    editInput.title = 'title';

    // List elemanına tıklandığı zaman span ve editSpan nesnesibi aktif-daktif duruma geçiyor.
    li.onclick = function(item){
        
        if(item.target.tagName=='LI'){
            if(li.className === ('list-group-item')){
                li.removeChild(span);
                li.removeChild(editSpan);
                li.id = 'checked';
            }else if(li.id === ('checked')){
                li.appendChild(span);
                li.appendChild(editSpan);
                li.id = ('');
            }  
        }
        
        
        
    }

    // span nesnesine tıklanma halinde görünmez hale getirdik ve sildik.
    span.onclick = function(){
        var li = this.parentElement;
        li.style.display = 'none';
        deleteItem(item);
        li.classList.remove('checked');
    }

    //////////////////////////
    editSpan.onclick = function(){

        li.appendChild(editInput);
        li.appendChild(editAdd);
        editAdd.appendChild(editAddText);

        if(li.className === ('list-group-item')){
            li.removeChild(span);
            li.removeChild(editSpan);
            li.id = 'editMode';
        }
        li.removeChild(t);
        editAdd.onclick = function(){
            
            
            var itemIndex = items.indexOf(item);
            var editItem = document.querySelector('#editTxt').value;
            items[itemIndex] = editItem;
            updateItems();
            t = document.createTextNode(editItem);
            li.appendChild(t);
            document.querySelector('#editTxt').value = '';

            if(li.id === ('editMode')){
                li.appendChild(span);
                li.appendChild(editSpan);
                li.removeChild(editInput);
                li.removeChild(editAdd);
                li.id = '';
            } 
        }
    }
}

// Seçili listeleri siler.
function deleteItem(deleteItems){
    for(i in deleteItems){
        let itemDelete = items.indexOf(deleteItems);
        delete (items[itemDelete]);
        items = items.filter(Boolean);
        updateItems();
    }
}

// İtems değişkeninin içindeki verileri todo anahtar kelimesi ile localStroge içine atıyoruz.
function updateItems(){
    localStorage.setItem('todo', JSON.stringify(items));
}
//localStorage.clear();