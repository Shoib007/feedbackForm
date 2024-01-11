import { useState } from 'react'
import './App.css'
import { notification, Rate, Button, Divider, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { BsSend } from "react-icons/bs";

const DEPLOYMENT_URL = import.meta.env.VITE_DEPLOYMENT_URL

function App() {
  const [infra, setInfra] = useState()
  const [facility, setFacility] = useState()
  const [environment, setEnvironment] = useState()
  const [receptionist, setReceptionist] = useState()
  const [satisfaction, setSatisfaction] = useState()
  const [schoolFeedback, setSchoolFeedback] = useState()
  const [festFeedback, setfestFeedback] = useState()
  const [otherFeedback, setOtherFeedback] = useState()
  const [loading, setLoading] = useState(false);

  const [api, contestHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    if (type === 'success') {
      api[type]({
        message: 'Submitted Successfully',
        description:
          'Thank You for your valuable feedback',
      });
    }
    else if (type === 'error') {
      api[type]({
        message: 'Opps, Form not submitted',
        description:
          'Sorry !! We could not submit the form as of now.',
      });
    }
  };


  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const handleSubmitions = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("infra", infra);
    formData.append("facility", facility);
    formData.append("environment", environment);
    formData.append("receptionist", receptionist);
    formData.append("satisfaction", satisfaction);
    formData.append("schoolFeedback", schoolFeedback);
    formData.append("festFeedback", festFeedback);
    formData.append("otherFeedback", otherFeedback);
    // const formDataObject = {};
    // formData.forEach((value, key) => {
    //   formDataObject[key] = value;
    // });

    // console.log(formDataObject);

    try {
      const response = await fetch(
        DEPLOYMENT_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(formData).toString(),
        }
      );

      if (response.ok) {
        setLoading(false);
        openNotificationWithIcon("success");
        console.log("Date Submitted");
        resetFormData();
        console.log(response.data);
      } else {
        setLoading(false);
        console.log("Got some Error");
      }
    } catch (err) {
      setLoading(false);
      openNotificationWithIcon("error");
      console.log("Not able to submit the data");
      console.log(err.message);
    }

  }

  const resetFormData = () => {
    setFacility(null);
    setInfra(0);
    setEnvironment(null);
    setReceptionist(null);
    setSatisfaction(null);
    setSchoolFeedback(null);
    setfestFeedback(null);
    setOtherFeedback(null);
  }


  return (
    <div className='h-screen w-screen relative'>
      {contestHolder}
      <Spin spinning={loading} fullscreen />
      <div className='w-full h-32 bg-green-600'></div>


      <div className='w-full sm:w-[70%] border p-4 my-4 absolute z-20 top-0 left-[50%] -translate-x-[50%] bg-slate-100'>

        <h1 className='text-3xl sm:text-4xl text-center'> EURO ACADEMY, TANDA </h1>

        <Divider><span className='text-xl sm:text-2xl text-center'>Feedback Form</span></Divider>

        <h1 className=' font-medium mb-8'> 1. Your Rating for our school </h1>

        <div className='w-full flex flex-col gap-4 mb-8'>

          <div className='flex gap-4 justify-around'>
            <div className='flex-1'>
              <h1> The Infrastructure </h1>
            </div>
            <Rate className='flex-1' tooltips={desc} onChange={setInfra} value={infra} />
          </div>

          <div className='flex gap-4 justify-around'>
            <div className='flex-1'>
              <h1> The Facilities </h1>
            </div>
            <Rate className='flex-1' tooltips={desc} onChange={setFacility} value={facility} />
          </div>

          <div className='flex gap-4 justify-around'>
            <div className='flex-1'>
              <h1> The School Environment </h1>
            </div>
            <Rate className='flex-1' tooltips={desc} onChange={setEnvironment} value={environment} />
          </div>

          <div className='flex gap-4 justify-around'>
            <div className='flex-1'>
              <h1> The Receptionist </h1>
            </div>
            <Rate className='flex-1' tooltips={desc} onChange={setReceptionist} value={receptionist} />
          </div>

          <div className='flex gap-4 justify-around'>
            <div className='flex-1'>
              <h1 className='text-start'> Overall Satisfaction </h1>
            </div>
            <Rate className='flex-1' tooltips={desc} onChange={setSatisfaction} value={satisfaction} />
          </div>
        </div>

        <h1 className=' font-medium mb-8'> 2. Your Feedback for our school </h1>

        <div className='mb-8'>
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} onChange={(e) => setSchoolFeedback(e.target.value)} value={schoolFeedback} />
        </div>


        <h1 className=' font-medium mb-8'> 3. Your Feedback for our Fest </h1>

        <div className='mb-8'>
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} onChange={(e) => setfestFeedback(e.target.value)} value={festFeedback} />
        </div>

        <h1 className=' font-medium mb-8'> 4. Other Feedback </h1>

        <div className='mb-8'>
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} onChange={(e) => setOtherFeedback(e.target.value)} value={otherFeedback} />
        </div>

        <div className='flex justify-end'>
          <Button type='primary' icon={<BsSend />} className=' bg-blue-500' onClick={() => handleSubmitions()}> SUBMIT </Button>
        </div>

      </div>
    </div>
  )
}

export default App
