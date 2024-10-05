import { Button, Input, Select } from 'antd';
import './App.css'
import Item from './components/item';
import { useEffect, useState } from 'react';




function App() {
  const [students,setStudents] = useState([])
  const [teachers,setTeachers]= useState([])
  const [statusStudent,setStatusStudent] =useState("1")
  const [refreshStudent,setRefreshStudent]= useState(false)
  const [refreshTeacher,setRefreshTeacher]= useState(false)


 function handleSubmit(e){
  e.preventDefault()
  const data ={
    name:e.target.name.value,
    surname:e.target.surname.value,
  }
  if(statusStudent =="1"){
    data.study = e.target.jobOrStudy.value
    fetch("http://localhost:3000/students",{
    method:"POST",
    body:JSON.stringify(data),
    headers:{
      "Content-type":"application/json"
    }
    }).then(res =>{
      setRefreshStudent =>!refreshStudent
    })
  }
  else{
    data.job = e.target.jobOrStudy.value
    fetch("http://localhost:3000/teachers",{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        "Content-type":"application/json"
      }
      }).then(res =>{
        setRefreshTeacher =>!refreshTeacher
      })
  }
 }
  useEffect(() =>{
   fetch("http://localhost:3000/students").then(res => res.json())
   .then(data =>setStudents(data))
  },[refreshStudent])


  useEffect(() =>{
   fetch("http://localhost:3000/teachers").then(res => res.json())
   .then(data =>setTeachers(data))
  },[refreshTeacher])
  return (
  <div >
    <form onSubmit={handleSubmit} className='w-[600px] p-5 rounded-md bg-slate-300 mx-auto mt-10'>
      <div className='flex  items-center justify-between space-x-4 '>
        <div className='flex flex-col w-[50%] space-y-2'>
        <Select
    allowClear   
    size='large'
    value={statusStudent}
    onChange={(e) =>setStatusStudent(e)}
    showSearch
    placeholder="Select a person"
    optionFilterProp="label"
    options={[
      {
        value: '1',
        label: 'Student',
      },
      {
        value: '2',
        label: 'Teacher',
      },
    ]}
  />
        <Input className='w-full' name='jobOrStudy' placeholder={`Enter ${statusStudent == '1' ? "Study place" : "job name" }`} size='large' allowClear/>
        </div>
        <div className='flex flex-col w-[50%] space-y-2'>
        <Input name='name' className='w-full' placeholder='Enter name' size='large' allowClear/>
        <Input name='surname' className='w-full' placeholder='Enter name' size='large' allowClear/>
        </div>
      </div>
        <Button htmlType='submit'  type='primary' size='large' className='w-full mt-2'>Add {statusStudent == '1' ? "Student" : "Teacher"}</Button>
    </form>
    <div className='flex justify-center gap-20 p-10'>
    <ul className='bg-slate-300 p-5 rounded-md space-y-4'>
      {students.map(item => <Item setRefreshTeacher={setRefreshTeacher} refreshTeacher={refreshTeacher} refreshStudent={refreshStudent} setRefreshStudent={setRefreshStudent} key={item.id} item={item}/>)}
    </ul>
    <ul className='bg-slate-300 p-5 rounded-md  space-y-4'>
      {teachers.map(item => <Item setRefreshTeacher={setRefreshTeacher} refreshTeacher={refreshTeacher} refreshStudent={refreshStudent} setRefreshStudent={setRefreshStudent}  key={item.id} item={item}/>)}
    </ul>
    </div>
  </div>
  )
}

export default App
