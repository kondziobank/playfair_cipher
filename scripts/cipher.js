const fillMatrix = () => {
  let userInput = window.sessionStorage
    .getItem("inputVal")
    .toLowerCase()
    .replaceAll("j", "i")
    .replace(/[^a-z]/g, "");
  let matrix = new Array(25);
  let alphabet = "abcdefghiklmnopqrstuvwxyz";

  let matrixIndex = 0;
  let keyIndex = 0;

  while (keyIndex < userInput.length) {
    // Fill in the keyword
    let letter = userInput.charAt(keyIndex);
    if (matrix.indexOf(letter) == -1) {
      matrix[matrixIndex] = letter;
      matrixIndex++;
    }
    keyIndex++;
  }

  for (let item in alphabet) {
    // Insert unique letters from the alphabet
    let literal = alphabet.charAt(item);
    if (matrix.indexOf(literal) == -1) {
      // if letter not in matrix
      matrix[matrixIndex] = literal;
      matrixIndex++;
    }
  }
  return matrix;
};

const getDigrams = (aString) => {
  let chunk, i, output, text;
  text = aString.toLowerCase().replace(" ", "");
  i = 0;
  output = [];

  while (i < text.length) {
    chunk = text.slice(i, i + 2);

    if (chunk.length === 1 || chunk[0] === chunk[1]) {
      output.push(chunk[0] + "x");
      i += 1;
    } else {
      output.push(chunk);
      i += 2;
    }
  }

  return output;
};

const encrypt = () => {
  let matrix = fillMatrix();
  let plainT = document
    .querySelector(".normalText")
    .value.toLowerCase()
    .replaceAll("j", "i")
    .replace(/[^a-z]/g, "");
  let digrams = getDigrams(plainT);
  let encryptedArray = [];
  let tempString = "";

  if (plainT == "") {
    alert("Please input a text to be encrypted.");
  } else {
    for (let i = 0; i < digrams.length; i++) {
      const letter1 = digrams[i][0];
      const letter2 = digrams[i][1];

      const letterPosition1 = matrix.indexOf(letter1);
      const letterPosition2 = matrix.indexOf(letter2);

      const min = Math.min(letterPosition1, letterPosition2);
      const max = Math.max(letterPosition1, letterPosition2);

      const minDistanceFromEdge = min % 5;
      const maxDistanceFromEdge = max % 5;

      const difference = Math.abs(letterPosition1 - letterPosition2);
      const mod5Result = difference % 5; // if 0 then, they are in the same column

      // if in the same column
      if (mod5Result == 0) {
        if (letterPosition1 >= 20) {
          // If at the bottom of column
          tempString += matrix[letterPosition1 - 20]; // go up
          tempString += matrix[letterPosition2 + 5]; // choose element below
        } else if (letterPosition2 >= 20) {
          tempString += matrix[letterPosition1 + 5]; // choose element below
          tempString += matrix[letterPosition2 - 20]; // go up
        } else {
          tempString += matrix[letterPosition1 + 5]; // choose element below
          tempString += matrix[letterPosition2 + 5]; // choose element below
        }
      }
      // if in the same row
      else if (difference <= 4 && maxDistanceFromEdge > minDistanceFromEdge) {
        //diagonal check
        if (difference == 4) {
          if ((max + 1) % 5 == 0) {
            if ((letterPosition1 + 1) % 5 == 0) {
              tempString += matrix[letterPosition1 - 4];
              tempString += matrix[letterPosition2 + 1];
            } else if ((letterPosition2 + 1) % 5 == 0) {
              tempString += matrix[letterPosition1 + 1];
              tempString += matrix[letterPosition2 - 4];
            }
          }
        } else {
          if ((letterPosition1 + 1) % 5 == 0) {
            tempString += matrix[letterPosition1 - 4];
            tempString += matrix[letterPosition2 + 1];
          } else if ((letterPosition2 + 1) % 5 == 0) {
            tempString += matrix[letterPosition1 + 1];
            tempString += matrix[letterPosition2 - 4];
          } else {
            tempString += matrix[letterPosition1 + 1];
            tempString += matrix[letterPosition2 + 1];
          }
        }
      }

      // diagonal part
      else {
        let counter = min;
        let rowD = 0;

        // if at the edge of matrix
        if ((min + 1) % 5 == 0 || minDistanceFromEdge > maxDistanceFromEdge) {
          while (Math.abs(counter - max) % 5 != 0) {
            // loop till the desired column is reached
            counter--;
            rowD--;
          }
        } else {
          while (Math.abs(counter - max) % 5 != 0) {
            //loop till the desired column is reached
            counter++;
            rowD++;
          }
        }

        if (letterPosition1 == min) {
          tempString += matrix[letterPosition1 + rowD];
          tempString += matrix[letterPosition2 - rowD];
        } else {
          tempString += matrix[letterPosition1 - rowD];
          tempString += matrix[letterPosition2 + rowD];
        }
      }

      encryptedArray.push(tempString);
      tempString = "";
    }
    document.querySelector(".encText").innerHTML = encryptedArray
      .toString()
      .replace(/,/gi, " ");
  }
};

const decrypt = () => {
  let matrix = fillMatrix();
  let ciphT = document
    .querySelector(".normalText2")
    .value.toLowerCase()
    .replaceAll("j", "i")
    .replace(/[^a-z]/g, "");
  let digrams = getDigrams(ciphT);
  let decryptedArray = [];
  let tempString = "";

  if (ciphT == "") {
    alert("Please input a text to be decrypted.");
  } else {
    for (let i = 0; i < digrams.length; i++) {
      let letter1 = digrams[i][0];
      let letter2 = digrams[i][1];

      let letterPosition1 = matrix.indexOf(letter1);
      let letterPosition2 = matrix.indexOf(letter2);

      let min = Math.min(letterPosition1, letterPosition2);
      let max = Math.max(letterPosition1, letterPosition2);

      let minDistanceFromEdge = min % 5;
      let maxDistanceFromEdge = max % 5;

      let difference = Math.abs(letterPosition1 - letterPosition2);
      let mod5Result = difference % 5; // if 0 then, they are in the same column

      // if in the same column
      if (mod5Result == 0) {
        if (letterPosition1 <= 4) {
          // If at the top of the column
          tempString += matrix[letterPosition1 + 20]; // go down
          tempString += matrix[letterPosition2 - 5]; // choose element above
        } else if (letterPosition2 <= 4) {
          tempString += matrix[letterPosition1 - 5];
          tempString += matrix[letterPosition2 + 20];
        } else {
          tempString += matrix[letterPosition1 - 5];
          tempString += matrix[letterPosition2 - 5];
        }
      }
      // if in the same row
      else if (difference <= 4 && maxDistanceFromEdge > minDistanceFromEdge) {
        // diagonal check
        if (difference == 4) {
          if ((max + 1) % 5 == 0) {
            if ((letterPosition1 + 1) % 5 == 0) {
              tempString += matrix[letterPosition1 - 1];
              tempString += matrix[letterPosition2 + 4];
            } else if ((letterPosition2 + 1) % 5 == 0) {
              tempString += matrix[letterPosition1 + 4];
              tempString += matrix[letterPosition2 - 1];
            }
          }
        } else {
          if ((letterPosition1 + 1) % 5 == 0) {
            tempString += matrix[letterPosition1 - 1];
            tempString += matrix[letterPosition2 - 1];
          } else if ((letterPosition2 + 1) % 5 == 0) {
            tempString += matrix[letterPosition1 - 1];
            tempString += matrix[letterPosition2 - 1];
          } else if (letterPosition1 % 5 == 0) {
            tempString += matrix[letterPosition1 + 4];
            tempString += matrix[letterPosition2 - 1];
          } else if (letterPosition2 % 5 == 0) {
            tempString += matrix[letterPosition1 - 1];
            tempString += matrix[letterPosition2 + 4];
          } else {
            tempString += matrix[letterPosition1 - 1];
            tempString += matrix[letterPosition2 - 1];
          }
        }
      }

      // diagonal part
      else {
        let counter = min;
        let rowD = 0;

        // if at the edge of matrix
        if ((min + 1) % 5 == 0 || minDistanceFromEdge > maxDistanceFromEdge) {
          while (Math.abs(counter - max) % 5 != 0) {
            counter--;
            rowD--;
          }
        } else {
          while (Math.abs(counter - max) % 5 != 0) {
            counter++;
            rowD++;
          }
        }

        if (letterPosition1 == min) {
          tempString += matrix[letterPosition1 + rowD];
          tempString += matrix[letterPosition2 - rowD];
        } else {
          tempString += matrix[letterPosition1 - rowD];
          tempString += matrix[letterPosition2 + rowD];
        }
      }

      decryptedArray.push(tempString);
      tempString = "";
    }
  }

  document.querySelector(".decText").innerHTML = decryptedArray
    .toString()
    .replace(/,/gi, " ");
};

const encButton2 = document.querySelector(".encButton")
if (encButton2 != null) {
  encButton2.addEventListener("click", encrypt);
}

const decButton2 = document.querySelector(".decButton")
if (decButton2 != null) {
  decButton2.addEventListener("click", decrypt);
}
