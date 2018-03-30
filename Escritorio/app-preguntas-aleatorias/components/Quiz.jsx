import React from 'react';
import './../assets/scss/quiz.scss';

import * as Utils from '../vendors/Utils.js';
import {addObjectives, objectiveAccomplished} from './../reducers/actions';

import QuizChoice from './QuizChoice.jsx';
import Video from './Video.jsx';
import Audio from './Audio.jsx';
import TimeDown from './TimeDown.jsx';
import { Panel } from 'react-bootstrap';

import $ from 'jquery'

const divVideoStyle = {
  width: '700px',
  height: '400px',
  float: 'right',
  position: 'relative',
};
const divQuizStyle = {
  width: '200px',
  height: '200px',
  float: 'right',
  position: 'relative',
};

export default class Quiz extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected_choices_ids:[],
      answered:false,
      numPregunta: 0,
      nextquestion:0,
      totalpreguntas:0,
      fin: 0,
      xml: "",
      jsoninterno: {},
      key_video: "0",
      source_video: "",
      longitud_respuestas:0,
      key_audio: "",
      source_audio:"",
      num_comodin: 0,
      modo_dificultad: 0,
      repeticiones_dificultad:0,
      key_segundos:0,
      texto_respuesta: "",
      texto_respuesta_quiz: "",
      random:0,
      array: [0,1]
    };
  }
  componentDidMount(){
/*
    $.ajax({
      url: "http://localhost:8080/config/videoquiz.xml",
      datatype: 'xml',
      cache: false,
      success: function(data) {
        this.setState({xml: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(status, err.toString());
      },
    });
*/
    //se crea la primera pregunta (numPregunta == 0)
    this.createQuestion(this.state.numPregunta);
    let objective = new Utils.objective({id:"MyQuiz", progress_measure:1, score:1});
    this.props.dispatch(addObjectives([objective]));


    var xmlprueba =
      '<?xml version="1.0" encoding="UTF-8"?>'+
      '<quiz>'+
      '<question type="category">'+
      '<category>'+
      '<text>Moodle QUIZ XML export</text>'+
      '</category>'+
      '</question>'+
      '<question type="truefalse">'+
      '<name>'+
      '<text>Señala la respuesta correcta</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Jugada legal, pasos 0, 1 y 2</text>'+
      '</questiontext>'+
      '<media>'+
      '<type>video</type>'+
      '<source>../assets/videos/video1.mp4</source>'+
      '</media>'+
      '<answer fraction="0">'+
      '<text>false</text>'+
      '</answer>'+
      '<answer fraction="0">'+
      '<text>false</text>'+
      '</answer>'+
      '</question>'+
      '<question type="truefalse">'+
      '<name>'+
      '<text>Señala la respuesta correcta</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Pasos, hay doble apoyo consecutivo con el mismo pie</text>'+
      '</questiontext>'+
      '<answer fraction="100">'+
      '<text>true</text>'+
      '</answer>'+
      '<answer fraction="100">'+
      '<text>true</text>'+
      '</answer>'+
      '</question>'+
      '<question type="truefalse">'+
      '<name>'+
      '<text>Señala la respuesta correcta</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Jugada legal, traspiés legal</text>'+
      '</questiontext>'+
      '<answer fraction="0">'+
      '<text>false</text>'+
      '</answer>'+
      '<answer fraction="0">'+
      '<text>false</text>'+
      '</answer>'+
      '</question>'+
      '<question type="truefalse">'+
      '<name>'+
      '<text>Señala la respuesta correcta</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Jugada ilegal por dar tres apoyos con el balón en las manos</text>'+
      '</questiontext>'+
      '<answer fraction="0">'+
      '<text>false</text>'+
      '</answer>'+
      '<answer fraction="0">'+
      '<text>false</text>'+
      '</answer>'+
      '</question>'+
      '<question type="category">'+
      '<category>'+
      '<text>Moodle QUIZ XML export</text>'+
      '</category>'+
      '</question>'+
      '<question type="multichoice">'+
      '<name>'+
      '<text>Señala la respuesta correcta­</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Señala la respuesta correcta</text>'+
      '</questiontext>'+
      '<shuffleanswers>0</shuffleanswers>'+
      '<single>false</single>'+
      '<media>'+
      '<type>video</type>'+
      '<source>../assets/videos/video1.mp4</source>'+
      '</media>'+
      '<answer fraction="0">'+
      '<text>Paso 0 correctamente aplicado</text>'+
      '</answer>'+
      '<answer fraction="100">'+
      '<text>Dos pasos consecutivos con el mismo pie. Violación</text>'+
      '</answer>'+
      '<answer fraction="0">'+
      '<text>Traspiés válido</text>'+
      '</answer>'+
      '<answer fraction="0">'+
      '<text>Jugada ilegal por dar tres apoyos con el balón en las manos</text>'+
      '</answer>'+
      '</question>'+
      '<question type="category">'+
      '<category>'+
      '<text>Moodle QUIZ XML export</text>'+
      '</category>'+
      '</question>'+
      '<question type="multichoice">'+
      '<name>'+
      '<text>Señala la respuesta correcta­</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Señala la respuesta correcta</text>'+
      '</questiontext>'+
      '<shuffleanswers>0</shuffleanswers>'+
      '<single>false</single>'+
      '<media>'+
      '<type>video</type>'+
      '<source>../assets/videos/video2.mp4</source>'+
      '</media>'+
      '<answer fraction="0">'+
      '<text>Paso 0 correctamente aplicado</text>'+
      '</answer>'+
      '<answer fraction="100">'+
      '<text>Dos pasos consecutivos con el mismo pie. Violación</text>'+
      '</answer>'+
      '<answer fraction="0">'+
      '<text>Traspiés válido</text>'+
      '</answer>'+
      '<answer fraction="0">'+
      '<text>Jugada ilegal por dar tres apoyos con el balón en las manos</text>'+
      '</answer>'+
      '</question>'+
      '<question type="category">'+
      '<category>'+
      '<text>Moodle QUIZ XML export</text>'+
      '</category>'+
      '</question>'+
      '<question type="multichoice">'+
      '<name>'+
      '<text>Señala la respuesta correcta</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Jugadores del Madrid de Baloncesto­</text>'+
      '</questiontext>'+
      '<shuffleanswers>0</shuffleanswers>'+
      '<single>false</single>'+
      '<media>'+
      '<type>video</type>'+
      '<source>../assets/videos/video3.mp4</source>'+
      '</media>'+
      '<answer fraction="100">'+
      '<text>Pasos tras rebote ofensivo</text>'+
      '</answer>'+
      '<answer fraction="0">'+
      '<text>Falta en acción de tiro</text>'+
      '</answer>'+
      '</question>'+
      '<question type="category">'+
      '<category>'+
      '<text>Moodle QUIZ XML export</text>'+
      '</category>'+
      '</question>'+
      '<question type="multichoice">'+
      '<name>'+
      '<text>Señala la respuesta correcta</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Pregunta audio</text>'+
      '</questiontext>'+
      '<shuffleanswers>0</shuffleanswers>'+
      '<single>false</single>'+
      '<media>'+
      '<type>audio</type>'+
      '<source>../assets/audios/audio0.mp3</source>'+
      '</media>'+
      '<answer fraction="100">'+
      '<text>Respuesta 1</text>'+
      '</answer>'+
      '<answer fraction="0">'+
      '<text>Respuesta 2</text>'+
      '</answer>'+
      '</question>'+
      '<question type="category">'+
      '<category>'+
      '<text>Moodle QUIZ XML export</text>'+
      '</category>'+
      '</question>'+
      '<question type="truefalse">'+
      '<name>'+
      '<text>Señala la respuesta correcta con respecto a la finalización</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Paso 0 correctamente aplicado</text>'+
      '</questiontext>'+
      '<media>'+
      '<type>video</type>'+
      '<source>../assets/videos/video2.mp4</source>'+
      '</media>'+
      '<answer fraction="0">'+
      '<text>true</text>'+
      '</answer>'+
      '<answer fraction="0">'+
      '<text>false</text>'+
      '</answer>'+
      '</question>'+
      '<question type="truefalse">'+
      '<name>'+
      '<text>Señala la respuesta correcta con respecto a la finalización</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Dos pasos consecutivos con el mismo pie. Violación</text>'+
      '</questiontext>'+
      '<answer fraction="100">'+
      '<text>true</text>'+
      '</answer>'+
      '<answer fraction="100">'+
      '<text>false</text>'+
      '</answer>'+
      '</question>'+
      '<question type="truefalse">'+
      '<name>'+
      '<text>Señala la respuesta correcta con respecto a la finalización</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Traspiés válido</text>'+
      '</questiontext>'+
      '<answer fraction="0">'+
      '<text>true</text>'+
      '</answer>'+
      '<answer fraction="0">'+
      '<text>false</text>'+
      '</answer>'+
      '</question>'+
      '<question type="category">'+
      '<category>'+
      '<text>Moodle QUIZ XML export</text>'+
      '</category>'+
      '</question>'+
      '<question type="truefalse">'+
      '<name>'+
      '<text>Señala la respuesta correcta</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Falta personal de tiro</text>'+
      '</questiontext>'+
      '<media>'+
      '<type>video</type>'+
      '<source>../assets/videos/video3.mp4</source>'+
      '</media>'+
      '<answer fraction="0">'+
      '<text>true</text>'+
      '</answer>'+
      '<answer fraction="0">'+
      '<text>false</text>'+
      '</answer>'+
      '</question>'+
      '<question type="truefalse">'+
      '<name>'+
      '<text>Señala la respuesta correcta con respecto a la finalización</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Pasos del jugador con balón tras rebote en ataque</text>'+
      '</questiontext>'+
      '<answer fraction="100">'+
      '<text>true</text>'+
      '</answer>'+
      '<answer fraction="100">'+
      '<text>false</text>'+
      '</answer>'+
      '</question>'+
      '<question type="category">'+
      '<category>'+
      '<text>Moodle QUIZ XML export</text>'+
      '</category>'+
      '</question>'+
      '<question type="truefalse">'+
      '<name>'+
      '<text>Señala la respuesta correcta</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Respuesta audio 1</text>'+
      '</questiontext>'+
      '<media>'+
      '<type>audio</type>'+
      '<source>../assets/audios/audio0.mp3</source>'+
      '</media>'+
      '<answer fraction="0">'+
      '<text>true</text>'+
      '</answer>'+
      '<answer fraction="0">'+
      '<text>false</text>'+
      '</answer>'+
      '</question>'+
      '<question type="truefalse">'+
      '<name>'+
      '<text>Señala la respuesta correcta</text>'+
      '</name>'+
      '<questiontext>'+
      '<text>Respuesta audio 2</text>'+
      '</questiontext>'+
      '<answer fraction="100">'+
      '<text>true</text>'+
      '</answer>'+
      '<answer fraction="100">'+
      '<text>false</text>'+
      '</answer>'+
      '</question>'+
      '</quiz>';

    var lista = [1,2,3,4];
    lista = lista.sort(function() {return Math.random() - 0.5});
    console.log(lista)
    this.setState({array:lista})

    var jsonpropio = {};
// string parseado a xml y a objeto para obtener json
    var parseString = require('xml2js').parseString;
    parseString(xmlprueba, function (err, result) {
      var json =(result);
      //json obtenido del parseado
      var customjson = {}
      customjson["quiz_xml"]={}
      customjson["quiz_xml"] = (json.quiz)
      console.log(customjson)
      //console.log("-------jsoninterno-----------");
      jsonpropio["quiz"]={};
      var i=0;
      var j=0;

      //caso de xml con mas de una pregunta y de diferentes tipos

      //sacar el numero de preguntas que tengo y la longitud de cada una de ellas


      var questions_size = [];
      var number_question = 0;
      var question_size =0;

      for(let i=0; i<json.quiz.question.length; i++){
        let tipo_pregunta = (json.quiz.question[i].$.type);
        if (tipo_pregunta == "category" && number_question==0){
          number_question++;
        } else if (tipo_pregunta != "category" && number_question!=0){
          question_size++;
        } else if (tipo_pregunta == "category" && number_question!=0){
          questions_size.push(question_size);
          question_size=0;
          number_question++;

        }
      }
      //mete en el array el tamaño de la última pregunta recorrida
      questions_size.push(question_size);
      //devuelve array preguntas

      //console.log("------------numero y longitud de las preguntas----------")
      //console.log("longitud del array de preguntas "+questions_size);


      //se obtiene el indice de las preguntas
      function indexQuestion (number_question){
        var index =0;
        var longitudes_anteriores_questions =0;
        var long_cat=0;
        //var longitudes_questions = [];
        //longitudes_questions = numberAndLengthQuestions();
        //console.log(longitudes_questions);
        if (number_question==0){console.log("error")};
        if(number_question==1){index =1}
        if(number_question !==1 && number_question<=questions_size.length){
          for(let i=0; i<number_question-1; i++){
            longitudes_anteriores_questions += questions_size[i];
            //console.log(longitudes_anteriores_questions);
          }
          long_cat = number_question;
          index = long_cat + longitudes_anteriores_questions;
        }

        return index;
      }
      /*
      console.log("-----------indice de las pregunta ----------------------")
      console.log("el indice de la pregunta 1 es "+indexQuestion(1));
      console.log("el indice de la pregunta 2 es "+indexQuestion(2));
      console.log("el indice de la pregunta 3 es "+indexQuestion(3));
      console.log("el indice de la pregunta 4 es "+indexQuestion(4));
      */
     // console.log("el indice de la pregunta 5 es "+indexQuestion(5));

      //for (let x =0 ; ...)

      //analisis del array de preguntas en funcion del numero de preguntas, indice de la pregunta y longitud de la pregunta

      console.log("---------------obtencion json-------------------------------------------")
      var nummc =1;
      var numtf =1;
      for (let i=1; i <= number_question;i++){
        var indice = indexQuestion(i);
        let tipo_pregunta = (json.quiz.question[indice].$.type);
        //console.log("el tipo de pregunta es "+i +tipo_pregunta);
        //el tipo de pregunta es truefalse
        if(tipo_pregunta == "truefalse"){

          jsonpropio["quiz"]["truefalse_"+numtf] = {};
          jsonpropio["quiz"]["truefalse_"+numtf]["tipo"] = (json.quiz.question[indice].$.type);
          jsonpropio["quiz"]["truefalse_"+numtf]["texto"] = (json.quiz.question[indice].name[0].text[0]);
          jsonpropio["quiz"]["truefalse_"+numtf]["media"] = {};
          jsonpropio["quiz"]["truefalse_"+numtf]["media"]["type"] = (json.quiz.question[indice].media[0].type[0]);
          jsonpropio["quiz"]["truefalse_"+numtf]["media"]["source"] = (json.quiz.question[indice].media[0].source[0]);
          //jsonpropio["quiz"]["truefalse_"+numtf]["audio"] = (json.quiz.question[indice].audio[0].source);
          //aray de preguntas --> questions_size
          for(let j=0; j<questions_size[i-1];j++){
            var k = 1+j;
            var t = indice+j
            jsonpropio["quiz"]["truefalse_"+numtf]["respuesta_" + k] = {};
            jsonpropio["quiz"]["truefalse_"+numtf]["respuesta_" + k]["texto"] = (json.quiz.question[t].questiontext[0].text[0]);
            jsonpropio["quiz"]["truefalse_"+numtf]["respuesta_" + k]["valor"] = (json.quiz.question[t].answer[0].$.fraction);

          }
          numtf++;
        }
        //el tipo de pregunta es multichoice
        else if (tipo_pregunta == "multichoice"){

          jsonpropio["quiz"]["pregunta_mc_"+nummc]= {};
          jsonpropio["quiz"]["pregunta_mc_"+nummc]["texto"]=(json.quiz.question[indice].questiontext[0].text[0]);
          jsonpropio["quiz"]["pregunta_mc_"+nummc]["media"]={};
          jsonpropio["quiz"]["pregunta_mc_"+nummc]["media"]["type"]=(json.quiz.question[indice].media[0].type[0]);
          jsonpropio["quiz"]["pregunta_mc_"+nummc]["media"]["source"]=(json.quiz.question[indice].media[0].source[0]);

          for(let j=0; j<json.quiz.question[indice].answer.length; j++){
            var k=1+j;
            jsonpropio["quiz"]["pregunta_mc_"+nummc]["respuesta_" + k] = {};
            jsonpropio["quiz"]["pregunta_mc_"+nummc]["respuesta_" + k]["texto"] = (json.quiz.question[indice].answer[j].text[0]);
            jsonpropio["quiz"]["pregunta_mc_"+nummc]["respuesta_" + k]["valor"] = (json.quiz.question[indice].answer[j].$.fraction);
          }
          nummc++;
        }
       // console.log("nummc vale"+nummc)
        //console.log("numtf vale"+numtf)
      }



      console.log("--------------------esquema json--------------------------");
      console.log(jsonpropio.quiz);



    });


    this.setState({jsoninterno: jsonpropio});
    console.log("------jsoninterno-------------------------------------");
  }

  //-----------------FIN COMPONENTDIDMOUNT--------------------------------------------
  //---------------------------------------------------------------------------------


//SELECCIONAR PREGUNTAS
  handleChoiceChange(choice){
    let newSelectedChoices = Object.assign([], this.state.selected_choices_ids);
    let indexOf = newSelectedChoices.indexOf(choice.id);
    if(indexOf === -1){
      newSelectedChoices.push(choice.id);
    } else {
      newSelectedChoices.splice(indexOf, 1);
    }
    this.setState({selected_choices_ids:newSelectedChoices});
  }
  onAnswerQuiz(){

    clearInterval(this.interval)
    // Calculate score
    let nChoices = this.props.quiz.choices.length;
    let correctAnswers = 0;
    let incorrectAnswers = 0
    let blankAnswers = 0;

    for(let i = 0; i < nChoices; i++){
      let choice = this.props.quiz.choices[i];
     // console.log(choice.answer)
      if(this.state.selected_choices_ids.indexOf(choice.id) !== -1){
        // Answered choice
        if(choice.answer == true){
          correctAnswers += 1;
        } else {
          incorrectAnswers += 1;
        }
      } else {
        blankAnswers += 1;
      }
    }
    let scorePercentage = Math.max(0, (correctAnswers - incorrectAnswers) / this.props.quiz.choices.filter(function(c){return c.answer === true;}).length);

    // Send data via SCORM
    let objective = this.props.tracking.objectives.MyQuiz;
    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));

    // Mark quiz as answered


    this.setState({answered:true, texto_respuesta_quiz:this.state.texto_respuesta});


  }
  onNextQuiz(){

    console.log("ENTRA AL NEXTQUIZ numpregunta ="+this.state.numPregunta)
    var nextquestion = this.state.totalpreguntas+1;
    console.log("siguiente pregunta ="+nextquestion)
    var a = 0;
    if(nextquestion != 5){
      var newQuestion = this.state.array[nextquestion-1]
      console.log("new question ="+newQuestion);
      this.setState({numPregunta: nextquestion, texto_respuesta_quiz:"",nextquestion:newQuestion, totalpreguntas:nextquestion});
      a = newQuestion

    } else {
      a = 5
    }

    this.createQuestion()


  }

  onResetQuiz(){
    this.setState({selected_choices_ids:[], answered:false,numPregunta:0, key_video:"0",source_video:"../assets/videos/gif.mp4",fin: 0, numPregunta:0})
    this.createQuestion(0)
  }
  onRepeatVideo(){
    var numero_comodin = this.state.num_comodin +1;
    console.log(numero_comodin);
    this.setState({num_comodin:numero_comodin});

    if(numero_comodin !=this.state.repeticiones_dificultad){
      var new_key_video = this.state.key_video + 1;
      this.setState({key_video:new_key_video});
      this.createQuestion(this.state.numPregunta);
    } else {
      this.createQuestion(5)
    }
  }
  selectFacil (){
    this.setState({modo_dificultad:0, repeticiones_dificultad:6, num_comodin:0})

  };
  selectMedio (){
    this.setState({modo_dificultad:1, repeticiones_dificultad:4, num_comodin:0})
  };
  selectDificil (){
    this.setState({modo_dificultad:2, repeticiones_dificultad:1, num_comodin:0})
  };





  //SENTANSWERS

  respuestas_XML_choices(respuestas, values){
    function getRandomInt(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let longitud_respuestas = respuestas.length;
    for(let i = 0; i < longitud_respuestas; i++){
      let random = getRandomInt(0,respuestas.length-1);
      this.props.quiz.choices[i].value = respuestas[random];
      this.props.quiz.choices[i].answer = values[random];
      respuestas.splice(random,1);
      values.splice(random, 1);
    }

  }

  createQuestion(numero){

    console.log("entro al create, numpregunta = "+this.state.numPregunta);
    console.log(this.state.nextquestion)

    let respuestas = [];
    let values = [];

    function getRandomInt(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let random = getRandomInt(1,4);



    let new_key_video = this.state.key_video + 1;

    //PREGUNTAS DEL 0 AL 5
    if(numero == 0){

      //console.log("estoy en la pregunta0");


     // console.log(this.state.jsoninterno)

      this.setState({
        key_video: new_key_video,
        source_video:"../assets/videos/gif.mp4"
      })



      this.props.quiz.value = "BIENVENIDO A REFEREE BASKETBALL TEST";

      let value0 = 100;
      let value1 = 100;
      let value2 = 100;
      let value3 = 100;

      values.push(value0);
      values.push(value1);
      values.push(value2);
      values.push(value3);

     // console.log(values.length);

      let texto0 = "Selecciona las opciones que consideres correctas";
      let texto1 = "Una repetición por pregunta. Puedes usar el comodín de repetición";
      let texto2 = "Obtén tu puntuación al final de la partida";
      let texto3 = "Para empezar, ANSWER + COMENZAR";

      respuestas[0] = texto0;
      respuestas[1] = texto1;
      respuestas[2] = texto2;
      respuestas[3] = texto3;

      this.setState({longitud_respuestas:respuestas.length});

      this.respuestas_XML_choices(respuestas, values);

      for(let i = 0; i < this.props.quiz.choices.length; i++){
        let choice = this.props.quiz.choices[i];
        if(choice.answer == 100) {
          choice.answer = true;
        }
        else {
          choice.answer = false;
        }
      }



    }

    else if(numero == 1){

      //console.log("estoy en la pregunta1"+this.state.jsoninterno.quiz.pregunta_mc_1.media.source);

      this.setState({
        key_video: new_key_video,
        source_video:this.state.jsoninterno.quiz.pregunta_mc_1.media.source,
        //meter campo en xml que sea solución de la pregunta
        texto_respuesta: "Atacante penetra a canasta realizando dos apoyos consecutivos con el mismo pie, por lo tanto es violación de pasos por traspiés"
      });




      //console.log(this.state.jsoninterno)
      //----------------------------------------------------------------------------------------------------------------------

      this.props.quiz.value = this.state.jsoninterno.quiz.pregunta_mc_1.texto;

      let value0 = this.state.jsoninterno.quiz.pregunta_mc_1.respuesta_1.valor;
      let value1 = this.state.jsoninterno.quiz.pregunta_mc_1.respuesta_2.valor;
      let value2 = this.state.jsoninterno.quiz.pregunta_mc_1.respuesta_3.valor;
      let value3 = this.state.jsoninterno.quiz.pregunta_mc_1.respuesta_4.valor;

      values.push(value0);
      values.push(value1);
      values.push(value2);
      values.push(value3);

     let texto0 = this.state.jsoninterno.quiz.pregunta_mc_1.respuesta_1.texto;
     let texto1 = this.state.jsoninterno.quiz.pregunta_mc_1.respuesta_2.texto;
     let texto2 = this.state.jsoninterno.quiz.pregunta_mc_1.respuesta_3.texto;
     let texto3 = this.state.jsoninterno.quiz.pregunta_mc_1.respuesta_4.texto;


      respuestas[0] = texto0;
      respuestas[1] = texto1;
      respuestas[2] = texto2;
      respuestas[3] = texto3;



      this.setState({longitud_respuestas:respuestas.length});

      this.respuestas_XML_choices(respuestas, values);

      for(let i = 0; i < this.props.quiz.choices.length; i++){
        let choice = this.props.quiz.choices[i];
        if(choice.answer == 100) {
          choice.answer = true;
        }
        else {
          choice.answer = false;

        }

      }


    }
    else if(numero == 2){
     // console.log("estoy en la pregunta2");


      this.setState({
        key_video: new_key_video,
        source_video:this.state.jsoninterno.quiz.pregunta_mc_2.media.source,
        texto_respuesta: "solucion de la pregunta 2"
      });


      //console.log(this.state.jsoninterno)

      this.props.quiz.value = this.state.jsoninterno.quiz.pregunta_mc_2.texto;

      let value0 = this.state.jsoninterno.quiz.pregunta_mc_2.respuesta_1.valor;
      let value1 = this.state.jsoninterno.quiz.pregunta_mc_2.respuesta_2.valor;
      let value2 = this.state.jsoninterno.quiz.pregunta_mc_2.respuesta_3.valor;
      //let value3 = this.state.jsoninterno.quiz.truefalse_2.respuesta_4.valor;

      values.push(value0);
      values.push(value1);
      values.push(value2);
      //values.push(value3);

      let texto0 = this.state.jsoninterno.quiz.pregunta_mc_2.respuesta_1.texto;
      let texto1 = this.state.jsoninterno.quiz.pregunta_mc_2.respuesta_2.texto;
      let texto2 = this.state.jsoninterno.quiz.pregunta_mc_2.respuesta_3.texto;
      //let texto3 = this.state.jsoninterno.quiz.truefalse_2.respuesta_4.texto;

      respuestas[0] = texto0;
      respuestas[1] = texto1;
      respuestas[2] = texto2;
     // respuestas[3] = texto3;

      this.setState({longitud_respuestas:respuestas.length});

      this.respuestas_XML_choices(respuestas, values);

      for(let i = 0; i < this.props.quiz.choices.length; i++){
        let choice = this.props.quiz.choices[i];
        if(choice.answer == 100) {
          choice.answer = true;
        }
        else {
          choice.answer = false;
        }
      }


    }
    else if(numero == 3){
      //console.log("estoy en la pregunta3");


      this.setState({
        key_video: new_key_video,
        source_video:this.state.jsoninterno.quiz.pregunta_mc_3.media.source,
        texto_respuesta: "solucion de la pregunta 3"
      });


      //console.log(this.state.jsoninterno)

      this.props.quiz.value = this.state.jsoninterno.quiz.pregunta_mc_3.texto;

      let value0 = this.state.jsoninterno.quiz.pregunta_mc_3.respuesta_1.valor;
      let value1 = this.state.jsoninterno.quiz.pregunta_mc_3.respuesta_2.valor;
      //let value2 = this.state.jsoninterno.quiz.truefalse_2.respuesta_3.valor;
      //let value3 = this.state.jsoninterno.quiz.truefalse_2.respuesta_4.valor;

      values.push(value0);
      values.push(value1);
      //values.push(value2);
      //values.push(value3);

      let texto0 = this.state.jsoninterno.quiz.pregunta_mc_3.respuesta_1.texto;
      let texto1 = this.state.jsoninterno.quiz.pregunta_mc_3.respuesta_2.texto;
      //let texto2 = this.state.jsoninterno.quiz.truefalse_2.respuesta_3.texto;
      //let texto3 = this.state.jsoninterno.quiz.truefalse_2.respuesta_4.texto;

      respuestas[0] = texto0;
      respuestas[1] = texto1;
      //respuestas[2] = texto2;
      // respuestas[3] = texto3;

      this.setState({longitud_respuestas:respuestas.length});

      this.respuestas_XML_choices(respuestas, values);

      for(let i = 0; i < this.props.quiz.choices.length; i++){
        let choice = this.props.quiz.choices[i];
        if(choice.answer == 100) {
          choice.answer = true;
        }
        else {
          choice.answer = false;
        }
      }




    } else if (numero == 4){
      console.log("estoy en la pregunta4--audio");


      this.setState({
        key_audio: new_key_video,
        source_audio:this.state.jsoninterno.quiz.pregunta_mc_4.media.source,
        texto_respuesta: "solucion de la pregunta 4"
      });


      //console.log(this.state.jsoninterno)

      this.props.quiz.value = this.state.jsoninterno.quiz.pregunta_mc_4.texto;

      let value0 = this.state.jsoninterno.quiz.pregunta_mc_4.respuesta_1.valor;
      let value1 = this.state.jsoninterno.quiz.pregunta_mc_4.respuesta_2.valor;
      //let value2 = this.state.jsoninterno.quiz.truefalse_2.respuesta_3.valor;
      //let value3 = this.state.jsoninterno.quiz.truefalse_2.respuesta_4.valor;

      values.push(value0);
      values.push(value1);
      //values.push(value2);
      //values.push(value3);

      let texto0 = this.state.jsoninterno.quiz.pregunta_mc_4.respuesta_1.texto;
      let texto1 = this.state.jsoninterno.quiz.pregunta_mc_4.respuesta_2.texto;
      //let texto2 = this.state.jsoninterno.quiz.truefalse_2.respuesta_3.texto;
      //let texto3 = this.state.jsoninterno.quiz.truefalse_2.respuesta_4.texto;

      respuestas[0] = texto0;
      respuestas[1] = texto1;
      //respuestas[2] = texto2;
      // respuestas[3] = texto3;

      this.setState({longitud_respuestas:respuestas.length});

      this.respuestas_XML_choices(respuestas, values);

      for(let i = 0; i < this.props.quiz.choices.length; i++){
        let choice = this.props.quiz.choices[i];
        if(choice.answer == 100) {
          choice.answer = true;
        }
        else {
          choice.answer = false;
        }
      }
    }
    else if (numero == 5){
      //console.log("estoy en la pregunta4-fin");
      this.setState({
        fin: 1, numPregunta:0,
      })
    }

    this.setState({selected_choices_ids:[], answered:false, key_segundos:this.state.key_segundos+1});


  }


  render(){
    console.log("render "+this.state.numPregunta)


    let aviso = ""
    if(this.state.modo_dificultad != 2){
      if(this.state.num_comodin >= this.state.repeticiones_dificultad - 1){
        aviso = "REPETICIONES AGOTADAS"
      }
    } else {
      aviso = ""
    } ;
    let comodines = ""
    if (this.state.modo_dificultad == 0){
      comodines = "Dispones de 5 repeticiones";
    } else if (this.state.modo_dificultad == 1){
      comodines = "Dispones de 3 repeticiones";
    } else if (this.state.modo_dificultad == 2){
      comodines = "no dispones de repeticiones";
    }

    let comodines_usados = ""
    if(this.state.modo_dificultad != 2){
      comodines_usados = "Repeticiones empleadas = "+this.state.num_comodin;
    }
     if (this.state.fin == 1){
      comodines_usados = "Final de la partida";
    }
    let boton_next = ""
    if (this.state.numPregunta == 0){
      boton_next = "comenzar"
    } else {
      boton_next = "siguiente"
    }
    let indice_pregunta = "Pregunta = "+this.state.numPregunta;
    let time= 5*this.state.numPregunta +5;


   let secondsRemaining = 35
   if(this.state.modo_dificultad == 1){
     secondsRemaining = 25
   } else if (this.state.modo_dificultad == 2){
     secondsRemaining = 20
   }

  if(this.state.fin == 0){

    if(this.state.numPregunta == 0){
      return (
        <div className="quiz">
          <Panel className="jumbotron w3-center w3-animate-left">
            <h1 className="quiz">{this.props.quiz.value}</h1>
            <h1 className="quiz">Selecciona el nivel de dificultad y haz click en comenzar</h1>
            <h1 className="quiz">Selecciona las opciones que consideres correctas</h1>
            <h1 className="quiz">Las preguntas tienen imágenes/vídeos/audios</h1>
            <h1 className="quiz">Puedes usar comodines = tener más tiempo por pregunta</h1>
              <div id="demo" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="../assets/imagenes/fbm.jpg" width="350" height="350" alt="crm"/>
                  </div>
                  <div className="carousel-item">
                    <img src="../assets/imagenes/arbitro.jpg" width="350" height="350" alt="cliente"/>
                  </div>
                  <div className="carousel-item">
                    <img src="../assets/imagenes/arbitro2.jpg" width="350" height="350" alt="objetivos"/>
                  </div>
                </div>
              </div>
          </Panel>
            <div className="quizButtonsWrapper">
              <button className="answerQuiz" onClick={this.selectFacil.bind(this)} >FÁCIL</button>
              <button className="answerQuiz" onClick={this.selectMedio.bind(this)} >MEDIO</button>
              <button className="answerQuiz" onClick={this.selectDificil.bind(this)} >DIFICIL</button>
              <button className="answerQuiz" onClick={this.onNextQuiz.bind(this)}>{boton_next}</button>
            </div>

        </div>
      );
    } else if(this.state.numPregunta  >0 || this.state.numPregunta != 4){

      let choices = [];
      //se le pasa a QuizChoice cada respuesta
      let r = this.state.longitud_respuestas
      for(let i = 0; i < r; i++){
        choices.push(<QuizChoice width="200" key={"MyQuiz_" + "quiz_choice_" + i} choice={this.props.quiz.choices[i]}
                                 checked={this.state.selected_choices_ids.indexOf(this.props.quiz.choices[i].id) !== -1}
                                 handleChange={this.handleChoiceChange.bind(this)}
                                 quizAnswered={this.state.answered}/>);
      }
      return (
        <div>
          <div style={divVideoStyle}>
            <Video video={this.state.source_video} key_video={this.state.key_video}/>
          </div>

          <div className="quiz">
            <h1  key={this.state.key_segundos}>
              <TimeDown secondsRemaining={secondsRemaining} onAnswerQuiz={this.onAnswerQuiz.bind(this)}
                        key_segundos={this.state.key_segundos}/>
            </h1>
            <h1 className="quiz">{this.props.quiz.value}</h1>
            <h1 className="quiz">{indice_pregunta}</h1>
            <p className="quiz">{comodines}</p>
            <p className="quiz">{comodines_usados}</p>
            <p className="quiz"><b>{aviso}</b></p>


            {choices}
            <p className="texto_respuesta_quiz">{this.state.texto_respuesta_quiz}</p>
            <div className="quizButtonsWrapper" >
              <button className="answerQuiz" onClick={this.onAnswerQuiz.bind(this)} /*disabled={this.state.answered}*/>Answer</button>
              <button className="resetQuiz" onClick={this.onResetQuiz.bind(this)} /*disabled={!this.state.answered}*/>Reset</button>
              <button className="answerQuiz" onClick={this.onNextQuiz.bind(this)} disabled={!this.state.answered}>{boton_next}</button>
              <button className="answerQuiz" onClick={this.onRepeatVideo.bind(this)} disabled={this.state.answered}>Repetir</button>

            </div>
          </div>
        </div>
      );
    }
    else  if (this.state.numPregunta == 4){
      let choices = [];
      //se le pasa a QuizChoice cada respuesta
      let r = this.state.longitud_respuestas
      for(let i = 0; i < r; i++){
        choices.push(<QuizChoice width="200" key={"MyQuiz_" + "quiz_choice_" + i} choice={this.props.quiz.choices[i]}
                                 checked={this.state.selected_choices_ids.indexOf(this.props.quiz.choices[i].id) !== -1}
                                 handleChange={this.handleChoiceChange.bind(this)}
                                 quizAnswered={this.state.answered}/>);
      }
      return (
        <div>
          <div style={divVideoStyle}>
            <Audio source_audio={this.state.source_audio} key_audio={this.state.key_video}/>
          </div>
          <div className="quiz">
            <h1  key={this.state.key_segundos}>
              <TimeDown secondsRemaining={secondsRemaining} onAnswerQuiz={this.onAnswerQuiz.bind(this)}
                        key_segundos={this.state.key_segundos}/>
            </h1>
            <h1 className="quiz">RENDER PREGUNTA 4</h1>
            <h1 className="quiz">{this.props.quiz.value}</h1>
            <h1 className="quiz">{indice_pregunta}</h1>
            <p className="quiz">{comodines}</p>
            <p className="quiz">{comodines_usados}</p>
            <p className="quiz"><b>{aviso}</b></p>
            <p className="quiz"><b>olaaaaaaaaaaaaaa</b></p>
            {choices}
            <p className="quiz">{this.state.texto_respuesta_quiz}</p>
            <div className="quizButtonsWrapper">

              <button className="answerQuiz" onClick={this.onAnswerQuiz.bind(this)} /*disabled={this.state.answered}*/>Answer</button>
              <button className="resetQuiz" onClick={this.onResetQuiz.bind(this)} /*disabled={!this.state.answered}*/>Reset</button>
              <button className="answerQuiz" onClick={this.onNextQuiz.bind(this)} disabled={!this.state.answered}>{boton_next}</button>
              <button className="answerQuiz" onClick={this.onRepeatVideo.bind(this)} disabled={this.state.answered}>Repetir</button>
            </div>
          </div>
        </div>
      );
    }
  }
 else{

  return(

      <div className="quiz">
        <h1>Final de cuestionario</h1>
        <h2>{comodines_usados}</h2>
        <div className="quizButtonsWrapper">


          <button className="resetQuiz" onClick={this.onResetQuiz.bind(this)} /*disabled={!this.state.answered}*/>Reintentar</button>

        </div>
      </div>

    );

 }


}


}
