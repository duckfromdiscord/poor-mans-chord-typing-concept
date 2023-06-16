window.dict = [];
window.possibilities = [];


// generic function to get the dictionary and split it by newlines
function update(doAlert) {
    fetch(document.getElementById("url").value)
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n');
        window.dict = lines;
        if (doAlert) {
            alert("Dictionary installed!");
        }
    })
    .catch(err => { throw err });
}

// update one time when the page is loaded, but do not alert
update(false);

// source: https://www.geeksforgeeks.org/how-to-find-unique-characters-of-a-string-in-javascript/#
function unique(str) {
    let uniq = [];
       
      for(let i = 0; i < str.length; i++){
        if(uniq.includes(str[i]) === false){
          uniq.push(str[i]);
        }
      }
      return uniq;
}

function valid(one, two) {
    // source: https://stackoverflow.com/questions/6229197/how-to-know-if-two-arrays-have-the-same-values ... I'm not a web dev, OK?
    return one.sort().join(',') === two.sort().join(',');
}

function clear() {
    for (i = 1; i <= 9; i++) {
        // empty the list one bby one
        document.getElementById('select')[i-1].innerHTML = "" + i + ".        ";
    }
}

function change() {

    // get (potentially) scrambled word 
    var content = document.getElementById('input').value;

    // if the last character is a number, select a value from the list and add it to the textbox
    split = content.split("");
    // check if last character is a digit
    if (!isNaN(parseInt(split[split.length - 1]))) {

        // get the selected word
        word = window.possibilities[parseInt(split[split.length - 1])-1];
        // if there is nothing there, do not add anything, but still clear the box.
        // clearing the box isn't technically needed but would be preferable in some cases
        if (word !== undefined) {
            document.getElementById('output').value += word + " ";
        }
        document.getElementById('input').value = "";
        window.possibilities = [];
    }


    var index = 1;
    window.possibilities = [];

    // clear the list box before continuing (to get rid of any residue from the last check)
    clear();

    window.dict.forEach( (item) => {
        // check if two words have the same letters
        if (valid( unique(content) , unique(item) )) {
            var zerobased = index-1;
            if (index > 9) {
                return;
            }
            // add it to the list
            document.getElementById("option" + index).value = item;
            document.getElementById("option" + index).content = item;
            document.getElementById('select')[zerobased].innerHTML = item;
            window.possibilities.push(item);
            index += 1;
        }
    });
}