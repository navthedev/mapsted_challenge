
 var arrWidth = 10;

$("#submit_button").click(function(){
    var user_option = $("#sort_option").val();
    var input_data = $("#input_value").val();
    var input_array = [];
    input_array = input_data.split(",");

    if ( input_data == null || input_data == '' || input_data == undefined){
       alert("input is empty, try again!");
       return;
    }
    if (input_array.length > 10){
        alert("no more than 10 values, try again!");
        return;
    }

    for (var i = 0; i < input_array.length; i++){
        if (parseInt(input_array) > 500 ){
            alert("value should be less than 500, try again!");
            return;
        }
    }

    if ( user_option == "select_sort"){
        selectsort();  

    }

    if ( user_option == "bubble_sort" ){
        bubblesort();

    }
        
});
    
function bubblesort(){
    var input_data = $("#input_value").val();
    var input_array = [];
    input_array = input_data.split(",");
    var virtualArr = [];


    //alert('inputdata:'+ input_data);

    $.ajax({
            type: "POST", 
            async: false,
            url: "../Sort/Bubblesort",  
            dataType: "json",
            data:{
                "input_string" : input_data
            },
            contentType:'application/x-www-form-urlencoded ',
            traditional: true,
            success: function (data) {

                for (var i = 0 ; i < data.length; i++){
                    virtualArr.push(data[i]);
                }
                //alert('virtualArr:'+ virtualArr); 
                animation(virtualArr);

            },
            error: function (){
                alert("error");
            }
        });
    

}


function selectsort(){
    var input_data = $("#input_value").val();
    var input_array = [];
    var virtualArr = [];

    input_array = input_data.split(",");



    $.ajax({
            type: "POST", 
            async: false,
            url: "../Sort/Selectsort",  
            dataType: "json",
            data:{
                "input_string" : input_data
            },
            contentType:'application/x-www-form-urlencoded ',
            traditional: true,
            success: function (data) {

                for (var i = 0 ; i < data.length; i++){
                    virtualArr.push(data[i]);
                }
                //alert('virtualArr:'+ virtualArr); 
                animation(virtualArr);
            },
            error: function (){
                alert("error");
            }
        });
    


}

function draw(arr){
    if (arr == null){
        return;
    }
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');

        var maxWidth = canvas.height;

        var width = 20;

        var space =20;


        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "18px serif";

    for (var i = 0; i < arr.length; i++) {
          ctx.fillStyle = '#61C5FE';        //color


          ctx.fillRect( 0,i * (width+space), arr[i], width);


          ctx.fillStyle = '#240be4';

         ctx.fillText(arr[i], arr[i]+5, i * (width+space)+15);
        }
           
           arrWidth += 100/arr.length ;
           if (arrWidth > 100)
            {
            arrWidth = 100 ;
            }
          document.getElementById("myBar").style.width = arrWidth + "%";
   ßßßß}


function animation(virtualArr){

    var interval = 500;
    virtualArr.forEach((item, index) => {
            setTimeout(() => draw(item), index * interval);
        });  
}




