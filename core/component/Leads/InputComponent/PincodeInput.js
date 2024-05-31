import React,{useEffect, useState, useRef} from 'react';
import Axios from "axios";
import leadStyle from '../css/leadStyle.module.css';
import {
    LEAD_BASE_URL,
    LEADSAPI
} from "@/utils/alljsonfile/leadService"
import Input from './Input';
import Loader from '../common/Loader';
import axios from 'axios';
import { BASE_URL, COMMON } from '@/utils/alljsonfile/service';

export default function PincodeInput(props) {
    const previousController = useRef();
    const [pinCode, setPinCode] = useState(props.data?.fieldData?.pinCode);
    const [loading, setLoading] = useState(false);

    
    const getData = (searchPinCode) => {
        if (previousController.current) {
          previousController.current.abort();
        }
        const controller = new AbortController();

        previousController.current = controller;
        let url = LEAD_BASE_URL + LEADSAPI.getPincodeList + `?pincode=${searchPinCode}`;

        let search = window.location.search;
        let params = new URLSearchParams(search);
        var h = params.get('h');

        let config = {
          headers: {
            'h': h
          }
        };

        Axios
        .get(url, config)
        .then(response => {
            setPinCode(response.data.data.pincodeData);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setPinCode([]);
            setLoading(false);
        });
    };

    const headers= {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }

    useEffect(() => {
        if (props?.value?.length === 6) {
          PinCodeVerify()
        }
      }, [props?.value?.length === 6])
    
      const PinCodeVerify = (e) => {
        axios
          .post(
            BASE_URL + COMMON?.pinCodeVerify,
            {
              pin_code: props?.value
            },
            { headers: headers }
          )
          .then((response) => {
          })
    
          .catch((error) => {
            console.log('ErrorVerifyPincode ==== : ', error)
          })
      }




    return (
        <>
            <Input 
                AutoComplete
                type="number"
                id="pin_code"
                name="pin_code"
                label="Pin Code"
                value={props.value}
                options={pinCode ? pinCode.map(option => option) : []}
                getOptionLabel={option =>option.value}
                onChange={props.onChange}
                className={[leadStyle.input,
                            props?.data?.fieldData?.pin_code?.error ? leadStyle.inputError : ''
                        ].join(' ')
                }
                onBeforeInput={(event) => {
                    // Only allow numeric input
                    if (!/^[0-9]*$/.test(event.data)) {
                        event.preventDefault();
                    }
                }}
                onInputChange={(event) => {
                    if (event.target.value && event.target.value.length >= 3 && event.target.value.length <= 6) {
                        setLoading(true);
                        getData(event.target.value);
                        if (props.setPincodeNumber) {
                     props.setPincodeNumber( event.target.value);
                    }  
                    }else{
                        setPinCode(prev => prev);
                    }
                }}
                onSelectChange={(suggestion)=>{
                    props?.data?.handleFieldData({...props.data.fieldData,
                        pin_code: {...props.data.fieldData?.pin_code,
                            value: suggestion.value,
                            pincodeId: suggestion.pincodeId,
                            pincodeCity: suggestion.pincodeCity,
                            pincodeState: suggestion.pincodeState
                        }
                    })
                    if (props.setPincodeNumber) {
                     props.setPincodeNumber(props?.value ? props?.value : suggestion.value);
                    }  
                }}
                endAdornment={
                    loading && 
                    <Loader color="#49d49d" height="6" width="6" /> 
                }
                maxLength={6}
                placeholder="Enter your pincode" 
                autoComplete="off"
                disabled={props?.data?.fieldData?.pincode?.locked}
                error={props?.data?.fieldData?.pincode?.error}
            /> 
        </>
    );
}
