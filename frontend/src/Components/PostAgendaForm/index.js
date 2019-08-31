import React from "react";

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
export const InputAgengaBoards = (props)=>{
  //numberOfBoardsの数だけボードを生成し、boardsに格納
  const boards = [...Array(props.numberOfBoards)].map((value,i)=>{
    return(
      //TODO: ここはイテレートしたい
      <div className="input-group-board" key={i}>
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
    <div className="input-group-boards">
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
          className:       "theme-create-form__input-theme-name",
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
          className:         "theme-create-form__input-group-name",
          name:             "candidate-name",
        },
        label:             "選択肢",
        value:             ""
      },
      message: {
        elementType:       "textarea",
        elementConfig:     {
          placeholder:       "例：かわいい",
          className:         "theme-create-form__input-group-message",
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

  handleSubmit(e){
    e.preventDefault();
    console.log(e);
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


    console.log("formdata-after:",formData)

    this.setState({form: formData})
  }

  render(){
    const agendaNameConfig = this.state.form.agenda.name  //agendaのnameを決めるためのinputの設定
    const candidateConfigs = this.state.form.candidate    //各candidateのそれぞれの入力項目の設定
    return(
      <div>
        <div className="theme-title">
          投票テーマ作成フォーム
        </div>
        <form className="theme-create-form" onSubmit={this.hundleSubmit}>
          
          <Input
            {...agendaNameConfig} 
            onChange={(event, name) => this.handleInputChange(event, name)}
          />
          <InputAgengaBoards
            numberOfBoards={2}
            onChange={(event, name, number) => this.handleInputChange(event, name, number)}
            configs={candidateConfigs}
          />
          <label>
            <div className="theme-create-form__submit"><span>作成！</span></div>
            <input type="submit" style={{display: "none"}} />
          </label>
        </form>
      </div>
    )
  }
}


export default PostAgendaForm;