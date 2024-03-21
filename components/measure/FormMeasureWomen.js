import { Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";


export default function FormMeasureWomen({idClient}) {


    const {register , watch , setValue , handleSubmit , formState:{errors}} = useForm({
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
            chest_measurement:'',
            bust_height:'',
            hip_width:''
        }
    })

    const toast = useToast()

    const empty_field = () =>{
        setValue('size_client','')
        setValue('weight_client' , '')
        setValue('chest_size','')
        setValue('waist_measure' , '')
        setValue('hip_circumference','')
        setValue('inseam_length','')
        setValue('neck_circumference','')
        setValue('wrist_circumference','')
        setValue('ankle_circumference','')
        setValue('chest_measurement','')
        setValue('bust_height','')
        setValue('hip_width','')
    }

    const onSubmit = async (data) => {
        console.log('Data measure women',{...data, client_id: idClient})

        axios.post('http://localhost:8181/api/tailor_management/measure_women' , {...data, client_id: idClient})
            .then(res => console.log('New measure sent'))
            .catch(err => console.error(err))

        empty_field()

        return toast({
            title: 'Measure added',
            description: "",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
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
                                    <Input type='number' step={'0.01'} {...register('size_client' , {required:{value:true, message:'Size client cant be null or empty'} , min:{value:0, message:'Value size client cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.size_client?.message}</div>
                            </div>
                            <div>
                                <div className="label my-1">Weight Client : </div>
                                <div>
                                    <Input type='number' step={'0.01'} {...register('weight_client', {required:{value:true, message:'Weight Client cant be null or empty'} , min:{value:0, message:'Value Weight Client cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.weight_client?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Chest size : </div>
                                <div>
                                    <Input type='number' step={'0.01'} {...register('chest_size', {required:{value:true, message:'Chest size cant be null or empty'} , min:{value:0, message:'Value Chest size cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.chest_size?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Waist measure : </div>
                                <div>
                                    <Input type='number' step={'0.01'} {...register('waist_measure' , {required:{value:true, message:'Waist measure cant be null or empty'} , min:{value:0, message:'Value Waist measure cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.waist_measure?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Hip Circumference : </div>
                                <div>
                                    <Input type='number' step={'0.01'} {...register('hip_circumference' , {required:{value:true, message:'Hip Circumference cant be null or empty'} , min:{value:0, message:'Value Hip Circumference cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.hip_circumference?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Inseam Length : </div>
                                <div>
                                    <Input type='number' step={'0.01'} {...register('inseam_length' , {required:{value:true, message:'Inseam Length cant be null or empty'} , min:{value:0, message:'Value Inseam Length cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.inseam_length?.message}</div>

                            </div>
                            
                        </div>

                        <div className="flex-1">
                            <div>
                                <div className="label my-1">Neck Circumference : </div>
                                <div>
                                    <Input type='number' step={'0.01'} {...register('neck_circumference', {required:{value:true, message:'Neck Circumference cant be null or empty'} , min:{value:0, message:'Value Neck Circumference cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.neck_circumference?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Wrist Circumference : </div>
                                <div>
                                    <Input type='number' step={'0.01'} {...register('wrist_circumference' , {required:{value:true, message:'Wrist Circumference cant be null or empty'} , min:{value:0, message:'Value Wrist Circumference  cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.wrist_circumference?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Ankle Circumference : </div>
                                <div>
                                    <Input type='number' step={'0.01'} {...register('ankle_circumference' , {required:{value:true, message:'Ankle Circumference cant be null or empty'} , min:{value:0, message:'Value Ankle Circumference cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.ankle_circumference?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Chest Measurement : </div>
                                <div>
                                    <Input type='number' step={'0.01'} {...register('chest_measurement' , {required:{value:true, message:'Chest Measurement cant be null or empty'} , min:{value:0, message:'Value Chest Measurement cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.chest_measurement?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Bust Height : </div>
                                <div>
                                    <Input type='number' step={'0.01'} {...register('bust_height', {required:{value:true, message:'Bust Height cant be null or empty'} , min:{value:0, message:'Value Bust Height cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.bust_height?.message}</div>

                            </div>
                            <div>
                                <div className="label my-1">Hip Width : </div>
                                <div>
                                    <Input type='number' step={'0.01'} {...register('hip_width' , {required:{value:true, message:'Hip Width cant be null or empty'} , min:{value:0, message:'Value Hip Width cant be less than 0 cm.'}})} size={'lg'} placeholder="" />
                                </div>
                                <div className='text-xs text-red-500'>{errors?.hip_width?.message}</div>

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