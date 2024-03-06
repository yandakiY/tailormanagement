import React from 'react'

const MeasureClientWomen = ({measures_clients_women}) => {
  return (
    <div>
        <div className='mb-3'>Measure :</div>
        {!measures_clients_women ? 
            <div>Not measure saved</div> 
                : 
            (measures_clients_women.map((measure, e) => 
                <div key={e} className='border p-4 font-bold mb-2'>
                    <div>
                        Measure of : {
                            new Date(measure.date_measure).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                            })
                        }
                    </div>

                    <div className='text-sm grid grid-cols-3 gap-2'>
                        <div className='border p-2'>Size : {measure.size_client} CM</div>
                        <div className='border p-2'>Weight Client : {measure.weight_client} CM</div>
                        <div className='border p-2'>Chest Size : {measure.chest_size} CM</div>
                        <div className='border p-2'>Waist Measure : {measure.waist_measure} CM</div>
                        <div className='border p-2'>Hip circumference : {measure.hip_circumference} CM</div>
                        <div className='border p-2'>Inseam length : {measure.inseam_length} CM</div>
                        <div className='border p-2'>Neck circumference : {measure.neck_circumference} CM</div>
                        <div className='border p-2'>Wrist circumference : {measure.wrist_circumference} CM</div>
                        <div className='border p-2'>Ankle circumference : {measure.ankle_circumference} CM</div>
                        <div className='border p-2'>Chest measurement : {measure.chest_measurement} CM</div>
                        <div className='border p-2'>Bust height : {measure.bust_height} CM</div>
                        <div className='border p-2'>Hip width : {measure.hip_width} CM</div>
                    </div>
                </div>
            ))
        }

        {/* {<div>

        </div>} */}
    </div>
  )
}

export default MeasureClientWomen