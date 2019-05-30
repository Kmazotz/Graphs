$( document ).ready(function(){

    document.getElementById('nodeName').placeholder = "Type node name, e.g Node1";

    window.nodes = [];

    window.edges = [];    

    window.network;

    
    $('#nodeName').on('focus', function(){
        $('#hideText').addClass('active');
    });

    $('#nodeName').on('blur', function(){
        $('#hideText').removeClass('active');
    });

    var select = $('#nodes').get(0);

    Array.prototype.unique=function(a){
        return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
    });

    function storeSelect( select, value) {

        let selectValue;

        selectValue = select.nextElementSibling.value = value;
               
        var parent = $(select).parent().get(0);
        var span = $(parent).children('span').get(0);
        $(span).text(selectValue);   
    }

    $(select.children[0]).on('click', function(){

        var element = $(this).children('ul').get(0);
        let icon = $(this).children('i').get(0);
        $(icon).toggleClass('active');         
        $(element).toggleClass('active');

        $(element.childNodes).on('click', function(){

            storeSelect(element,$(this).text());
        })        

    });

    $(select.children[1]).on('click', function(){

        var element = $(this).children('ul').get(0);
        let icon = $(this).children('i').get(0);
        $(icon).toggleClass('active');         
        $(element).toggleClass('active');

        $(element.childNodes).on('click', function(){

            storeSelect(element,$(this).text());
        })
    });

    function LinkNode(node1 , node2, array) {
        let value;
        let list = array.unique();
        if ( node1 !== node2) {
            for (let i = 0; i < list.length; i++) {
                if (node1 === list[i].label ) {
                    value = list[i].id;
                    for (let i = 0; i < list.length; i++) {
                        if (node2 === list[i].label) {
                            window.edges.push({from: value, to: list[i].id});
                        } 
                    }
                }    
            } 
        } else if(node1 === undefined || node2 === undefined){
            console.log('the nodes can not be empty');            
        }else{
            console.log('the nodes could not be joined');
        }
    }

    function PushNode(array, firstElement, secondElement){

        var list = []

        $(firstElement).empty();
        $(secondElement).empty();
        
        for (let i = 0; i < array.length; i++) {

            if(list.lenght > 0 && list[i].label  !== array[i].label){
                list.push({label : array[i].label, id: array[i].id });
            }else{
                list.push({label : array[i].label, id: array[i].id });
            }
                var nodes = $('#nodes').get(0);
                let li = document.createElement('li');
                let option = document.createElement('option');
                let textLi = document.createTextNode(list[i].label);
                let textOption = document.createTextNode(list[i].label);
                let optionAttr = document.createAttribute('value');
                optionAttr.value = list[i].id;
                li.appendChild(textLi);
                option.appendChild(textOption);
                option.setAttributeNode(optionAttr);

                if (secondElement.id !== "node2") {
                    $(firstElement).append(li);
                    $(secondElement).append(option);
                    $(select.children[0]).each(function(){
                        $($(this).children('ul').get(0)).removeClass('active');
                        $($(this).children('i').get(0)).removeClass('active');
                    });
                    $(select.children[1]).each(function(){
                        $($(this).children('ul').get(0)).removeClass('active');
                        $($(this).children('i').get(0)).removeClass('active');
                    })
                    
                }else{
                    if (i > 0) {
                        $(firstElement).append(li);
                        $(secondElement).append(option);
                        $(nodes.children[0]).removeClass('active');
                        $(nodes.children[1]).removeClass('active');
                    }
                }

        }           
        
    }

    function NodeList( array ) {
        var node1 =  $('#nodes').children().get(0);
        var node2 =  $('#nodes').children().get(1);

        for (let i = 0; i < array.length; i++) {


            if(i > 0){

                PushNode(array, node1.children[2], node1.children[3]);
                PushNode(array, node2.children[2], node2.children[3]);

            }else{
                
                PushNode(array,node1.children[2],node1.children[3]);

            }

        }        
        
    }
    
    $('#store').on('submit', function(e){

        e.preventDefault();

        var nodeValue = $('#nodeName').val();
        
        if(nodeValue != ""){      
        
            window.nodes.push({ id : nodes.length + 1, label : nodeValue });
            $('#nodeName').val("");
            $('#alert').text("");
            NodeList( window.nodes );
        }else{
            $('#alert').text('The name field should not be empty, please try again.');
        }

        window.network = new vis.Network(container, data, {});
    });

    $('#nodeList').on('submit', function(e){

        e.preventDefault();
        let parent1, parent2, value1, value2;

        if ($('#node1').length > 0 && $('#node2').length > 0) {
            parent1 = $('#node1').parent().get(0);
            parent2 = $('#node2').parent().get(0);
            value1 = $(parent1).children('span').get(0);
            value2 = $(parent2).children('span').get(0);
            
            LinkNode($(value1).get(0).textContent, $(value2).get(0).textContent, window.nodes);            

        }

        window.network = new vis.Network(container, data, {})
        
    });

    var container = document.getElementById('Showing');

    var data = {
        nodes: window.nodes,
        edges: window.edges
    };

})