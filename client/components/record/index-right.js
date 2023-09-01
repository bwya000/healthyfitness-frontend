import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Calendar from '@/components/record/calendar'
import Collapse_RAT from '@/components/record/collapse/collapse-rat'
import Collapse_TDEE from '@/components/record/collapse/collapse-tdee'

export default function Indexright() {
  return (
    <>
      

      <div class="col-5 mt-5 ps-4">
        <div class="container">
          {/* calendar */}
          <Calendar />

          {/* ratchart */}

          
            <Collapse_RAT />
          

          {/* tdeechart */}
          
            <Collapse_TDEE />
       
        </div>
      </div>
    </>
  )
}
