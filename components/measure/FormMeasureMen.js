import { Button, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function FormMeasureMen({idClient}) {

    const {register , watch , handleSubmit , formState:{errors}} = useForm({
        defaultValues:{
            size_client:'',
            weight_client:'',
            chest_size:'',
            waist_measure:'',
            hip_circumference:'',
            inseam_length:'',
            neck_circumference:'',
            wrist_circumference:'',
            ankle_circumference:'',
            biceps_circumference:'',
            chest_measurement:'',
            waist_measurement:''
        }
    })

    const onSubmit = async (data) => {

        console.log('Data measure men',data)
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-row justify-center my-6">
                <div className="flex flex-col items-center ">

                    <div className="flex flex-wrap gap-x-5">
                        <div className="flex-1">
                            <div>
                                <div className="label my-1">Size Client : </div>
                                <div>
                                    <Input type='number' {...register('size_client' , {required:{value:true, message:'Size client cant be null or empty'} , min:{value:0, message:'Value size client cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.size_client?.message}</div>
                            </div>
                            <div>
                                <div className="label my-1">Weight Client : </div>
                                <div>
                                    <Input type='number' {...register('weight_client', {required:{value:true, message:'Weight Client cant be null or empty'} , min:{value:0, message:'Value Weight Client cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.weight_client?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Chest size : </div>
                                <div>
                                    <Input type='number' {...register('chest_size', {required:{value:true, message:'Chest size cant be null or empty'} , min:{value:0, message:'Value Chest size cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.chest_size?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Waist measure : </div>
                                <div>
                                    <Input type='number' {...register('waist_measure' , {required:{value:true, message:'Waist measure cant be null or empty'} , min:{value:0, message:'Value Waist measure cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.waist_measure?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Hip Circumference : </div>
                                <div>
                                    <Input type='number' {...register('hip_circumference' , {required:{value:true, message:'Hip Circumference cant be null or empty'} , min:{value:0, message:'Value Hip Circumference cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.hip_circumference?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Inseam Length : </div>
                                <div>
                                    <Input type='number' {...register('inseam_length' , {required:{value:true, message:'Inseam Length cant be null or empty'} , min:{value:0, message:'Value Inseam Length cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.inseam_length?.message}</div>

                            </div>
                            
                        </div>

                        <div className="flex-1">
                            <div>
                                <div className="label my-1">Neck Circumference : </div>
                                <div>
                                    <Input type='number' {...register('neck_circumference', {required:{value:true, message:'Neck Circumference cant be null or empty'} , min:{value:0, message:'Value Neck Circumference cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.neck_circumference?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Wrist Circumference : </div>
                                <div>
                                    <Input type='number' {...register('wrist_circumference' , {required:{value:true, message:'Wrist Circumference cant be null or empty'} , min:{value:0, message:'Value Wrist Circumference  cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.wrist_circumference?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Ankle Circumference : </div>
                                <div>
                                    <Input type='number' {...register('ankle_circumference' , {required:{value:true, message:'Ankle Circumference cant be null or empty'} , min:{value:0, message:'Value Ankle Circumference cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.ankle_circumference?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Biceps Circumference : </div>
                                <div>
                                    <Input type='number' {...register('biceps_circumference' , {required:{value:true, message:'Biceps Circumference cant be null or empty'} , min:{value:0, message:'Value Biceps Circumference cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.biceps_circumference?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Chest Measurement : </div>
                                <div>
                                    <Input type='number' {...register('chest_measurement', {required:{value:true, message:'Chest Measurement cant be null or empty'} , min:{value:0, message:'Value Chest Measurement cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.chest_measurement?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Waist Measurement : </div>
                                <div>
                                    <Input type='number' {...register('waist_measurement' , {required:{value:true, message:'Waist Measurement cant be null or empty'} , min:{value:0, message:'Value Waist Measurement cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.waist_measurement?.message}</div>

                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <button type="submit" className="text-white bg-black hover:bg-slate-900 text-lg px-6 py-2 rounded">Save</button>
                    </div>
                </div>
            </form>
        </>
    )
}