import React from "react";
import axios from "axios";

//TODO: バリデーション作る

//

/**
 * 与えられた情報を元にinput要素を生成するComponent。
 * 
 * @param {*} props
 *   @param {method} onChange
 *   @param {string} value
 *   @param {string} elementType   - HTMLタグ名
 *   @param {object} elementConfig - type, placeholder, className,name
 *                                   HTMLタグに与える属性の設定
 */
export const Input = (props) => {
  let  inputElement = null;
  const inputAttributes = {
    ...props.elementConfig,
    value: props.value,
    onChange: (event) => props.onChange(event, props.elementConfig.name)
  }


  //elementTypeに対応したHTMLタグを作成
  switch(props.elementType){
    case("input"):
      inputElement = <input {...inputAttributes} />;
      break;
    case("textarea"):
      inputElement = <textarea {...inputAttributes}  />;
      break;
    default:
      inputElement = <input {...inputAttributes}  />;
  }

  return(
    <React.Fragment>
      <label htmlFor={props.className}>{props.label}</label><br />
      { inputElement }
      <br />
    </React.Fragment>
  )
}


/**
 * 選択候補の数だけボードを生成する。
 * 各ボードは選択候補の設定を行うためのInputコンポーネントを複数持つ
 * 
 * @param {*} props
 *   @param {method} onChange
 *   @param {number} numberOfBoards
 *   @param {object} configs
 * configs = [{
      name: {
        elementType,
        elementConfig:     {type, placeholder, className, name},
        label,
        value,
      }
    }]
 */
export const InputCandidateBoards = (props)=>{
  //numberOfBoardsの数だけボードを生成し、boardsに格納
  const boards = [...Array(props.numberOfBoards)].map((value,i)=>{
    return(
      //TODO: ここはイテレートしたい
      <div className="input-candidate-board" key={i}>
        <Input
          {...props.configs[i].name}
          onChange={(event, name) => props.onChange(event, name, i)}
        />
        <Input
          {...props.configs[i].message}
          onChange={(event, name) => props.onChange(event, name, i)}
        />
        <label key={`label${i}`}>画像</label><br />
        <input
          type="file"
          onChange={props.onChange}
        />
      </div>
    )
  })


  return(
    <div className="input-candidate-boards">
      {boards}
    </div>
  )
}

/**
 * 投票テーマAgendaと、それに選択肢(Candidate)を設定する投稿フォーム。
 * Agenda設定欄と、複数のCandidate設定ボードから成り立つ
 */
class PostAgendaForm extends React.Component{

  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

  // const xxxxConfig = {
  //     入力項目名: {
  //       elementType:     -> HTMLタグ名 <input> or <textarea>
  //       elementConfig:   -> inputに当てる属性の設定
  //       label:           -> inputに付属するlabelのvalue
  //       value:           -> value
  //     }
  //   }
    
    const agendaConfig = {
      name: {
        elementType:     "input",
        elementConfig:   {
          type:            "text",
          placeholder:     "",
          className:       "agenda-create-form__input-agenda-name",
          name:            "agenda-name",
        },
        label:           "投票テーマ",
        value:           ""
      }
    }
    const candidateConfig = {
      name: {
        elementType:       "input",
        elementConfig:     {
          type:              "text",
          placeholder:       "例：犬派",
          className:         "agenda-create-form__input-candidate-name",
          name:             "candidate-name",
        },
        label:             "選択肢",
        value:             ""
      },
      message: {
        elementType:       "textarea",
        elementConfig:     {
          placeholder:       "例：かわいい",
          className:         "agenda-create-form__input-candidate-message",
          name:            "candidate-message",
        },
        label:            "メッセージ",
        value:            ""
      }
    }

    const candidateConfigs = [
      candidateConfig,
      candidateConfig
    ]

    this.state = {
      form: {
        agenda: agendaConfig,
        candidate: candidateConfigs
      }  
    }
  }

  /**
   * オブジェクトの中からpermitedKeysに対応するkey/valueペアを抽出し、新しいオブジェクトを作る汎用メソッド
   * 
   * @param {Object} obj 
   * @param {Array} permitedKeys 
   */
  narrowDownByKeys(obj,permitedKeys){
    let newObj = {}
    for(let key in obj){
      if(permitedKeys.includes(key)){
        newObj[key] = obj[key]
      }
    }
    return newObj
  }

  /**
   * 受け渡されたオブジェクトが持つ、全ての子オブジェクトからvalueを抽出して新しいオブジェクトを作る。
   * 適用例：
   * { hoge: {name: "ほげ", value: 100}, huga: {name: "ふが", value: 200}}
   * => {hoge: 100, huga: 200}
   * 
   * @param {Object} obj
   */
  narrowDownAllElement(obj){
    let narrowDownedObj = {}
    for(let input in obj){
      narrowDownedObj[input] = obj[input]["value"] //this.narrowDownByKeys(inputCategory[input], ["value"])
    }
    return narrowDownedObj
  }

  /**
   * stateに格納したformのデータからRailsAPIに受け渡したいデータのみを抽出し、整形した状態のObject作成し、返す。
   * 
   * @param {Object} formData 
   */
  prettyfyFormData(formData){
    let prettyData = {}
    for(let inputCategory in formData){
      //要素が配列であればその全てにnarrowDownAllElementメソッドを適用、単品であればそれに直接narrowDownAllElementを適用。
      if(Array.isArray(formData[inputCategory])){
        prettyData[inputCategory] = formData[inputCategory].map((inputCategory)=> this.narrowDownAllElement(inputCategory))
      }else{
        prettyData[inputCategory] = {}
        prettyData[inputCategory] = this.narrowDownAllElement(formData[inputCategory])
      }
    }
    return prettyData
  }


  handleSubmit(e){
    e.preventDefault();
    let data = this.prettyfyFormData(this.state.form)
    const url = "http://localhost:4000/agendas"
    axios.post(url, data).then(res => {
      console.log(res)
    })
  }

  /**
   * inputに入力があった際に、入力された値とstateの同期を取るMethod。
   * 
   * @param {*} event 
   * @param {*} table 
   * @param {*} column 
   * @param {*} number 
   */
  handleInputChange(event, name, number){
    //formのデータをディープコピー
    const formData = JSON.parse(JSON.stringify(this.state.form))
    const table = name.split("-")[0]
    const column = name.split("-")[1]

    switch(table){
      case("agenda"):
        formData.agenda[column].value = event.target.value
        break;
      case("candidate"):
        formData.candidate[number][column].value = event.target.value
        break;
    } 
    this.setState({form: formData})
  }

  render(){
    const agendaNameConfig = this.state.form.agenda.name  //agendaのnameを決めるためのinputの設定
    const candidateConfigs = this.state.form.candidate    //各candidateのそれぞれの入力項目の設定
    return(
      <div>
        <div className="agenda-title">
          投票テーマ作成フォーム
        </div>
        <form className="agenda-create-form" onSubmit={this.handleSubmit}>

          <Input
            {...agendaNameConfig} 
            onChange={(event, name) => this.handleInputChange(event, name)}
          />
          <InputCandidateBoards
            numberOfBoards={2}
            onChange={(event, name, number) => this.handleInputChange(event, name, number)}
            configs={candidateConfigs}
          />
          <label>
            <div className="agenda-create-form__submit"><span>作成！</span></div>
            <input type="submit" style={{display: "none"}} />
          </label>
        </form>
      </div>
    )
  }
}


export default PostAgendaForm;