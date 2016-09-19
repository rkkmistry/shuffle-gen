var texts = [];

function processText() {
  var weights = [];
  var final = ""
  
  $("#display").html("");
  
  $(".weight").each(function(){
    weights.push(parseFloat($(this).val()));
  });
  
  for(var i = 0; i < $("#lines").val(); i++) {
    test = chance.weighted(["a", "b"], [1, 1]);
    choice = chance.weighted(texts, weights);
    final += (chance.pick(choice.split("\n")) + "<br>");
  }
  
  $("#display").append(final);
  
}

function previewFiles() {

  var preview = document.querySelector('#preview');
  var files   = document.querySelector('input[type=file]').files;

  function readAndPreview(file) {
    // Make sure `file.name` matches our extensions criteria
    if ( /\.(txt)$/i.test(file.name) ) {
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        $("#preview").append("<div class='text'>" + file.name + "<input type='number' value=" + 1/files.length + " step=1 max=10 min=0 class='weight' id=" + file.name + "></div>"); 
        texts.push(reader.result);
        
        //changes default values of weights so it adds to 1
        $(".weight").each(function(){
          $(this).attr("value", 1/texts.length)
        });
        
      }, false);

      reader.readAsText(file);
    }
  }

  if (files) {
    [].forEach.call(files, readAndPreview);
  }

}