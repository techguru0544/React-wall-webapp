import React, {Component} from 'react'
import styled from 'styled-components'
import { IoIosArrowDown } from 'react-icons/io';
import {getRolesQuery} from '../../../api/Queries'

class FormDropDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropDownShowing:false,
      roleOptions:[],
      getRolesErr: null
    }
  }
  componentDidMount(){
    getRolesQuery()
      .then((resp)=>{
        if(resp.status === 'success'){
          this.setState({roleOptions: resp.data})
        }else{
          this.setState({getRolesErr: 'An error has occured retrieving roles'})
        }
      })
  }
  toggle=()=>{
    this.setState({dropDownShowing: !this.state.dropDownShowing})
  }
  render(){
    const {roleOptions, getRolesErr} = this.state;
    const {setFieldValue, companyRole} = this.props;
    return (
      <DropDownContainer onClick={()=>this.toggle()}>
        <InputTitle>
          Whats the role at your current company?
        </InputTitle>
        <FormInput style={{borderRadius: this.state.dropDownShowing ? '4px 4px 0px 0px' : '4px'}}>
          {companyRole ?
            <RoleName
              options={roleOptions}
              id={companyRole}
            /> :
            <span>
              Select a role
            </span>
          }
          <IoIosArrowDown size={18} />
        </FormInput>
        <DropDown style={{display: this.state.dropDownShowing ? 'block' : 'none'}}>
          {roleOptions.map((option, i)=>{
            return(
              <Option
                key={i}
                onClick={()=>setFieldValue('companyRole', option.id)}
              >
                {option.role}
              </Option>
            );
          })}
        </DropDown>
        <ResponseError>
          {getRolesErr}
        </ResponseError>
      </DropDownContainer>
    );
  }
}
const RoleName = ({id, options})=>{
  return(
    options.map((option,i)=>{
      if(option.id === id){
          return(option.role)
      }else{
        return undefined
      }
    })
  );
}
export default FormDropDown;

const DropDownContainer = styled.div`
position:relative;
`
const ResponseError = styled.div`
color: grey;
min-height:20px;
`
const Option = styled.div`
width:100%;
text-align:left;
background:none;
border:none;
padding:10px;
`
const DropDown = styled.div`
display:grid;
border: 2px solid #9B9B9B;
border-top:none;
border-radius: 0px 0px 4px 4px;
z-index:5;
max-height: 100px;
overflow:hidden;
overflow-y:scroll;
`
const InputTitle = styled.div`
margin-top:1%;
  font-size: 14px;
  font-weight: 500;
`
const FormInput = styled.div`
border: 2px solid #9B9B9B;
color:#9B9B9B;
background-color:white;
border-radius: 4px 4px 0px 0px;
width:100%;
padding:10px;
margin-top:2%;
display:flex;
align-items:center;
justify-content:space-between;
@media (max-width: 768px) {
  width:100%;
}
`
