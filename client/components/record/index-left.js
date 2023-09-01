import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Collapse_BMI from '@/components/record/collapse/collapse-bmi'
import Collapse_CAL from '@/components/record/collapse/collapse-cal'

export default function Indexright() {
  return (
    <>
      <div className="col-6 mt-5 pe-5 ps-4">
        {/* BMIChar */}
        
          <Collapse_BMI />
        
        {/* calories */}
        
          <Collapse_CAL />       
      </div>
    </>
  )
}
