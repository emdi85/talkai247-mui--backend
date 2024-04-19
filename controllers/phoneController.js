import asyncHandler from 'express-async-handler';
import Twilio from 'twilio';

const getPhones = asyncHandler(async (req, res) => {
    try {
        const { CN } = req.body;
        const client = Twilio(process.env.TWILIO_ACC_ID, process.env.TWILIO_AUTHTOKEN);
        const availableNumbers = await client.availablePhoneNumbers(`${CN}`).local.list({
            voiceEnabled: true,
        });
        if (availableNumbers.length > 0) {
            console.log(availableNumbers)
            res.status(200).send(
                {
                    code: 200,
                    success: true,
                    timestamp: Date.now(),
                    message: "All availableNumbers Response",
                    data: availableNumbers
                }
            );
        } else {
            res.status(404).json({ error: 'No availableNumbers found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
        console.log(error)
    }
});

const buyPhones = asyncHandler(async (req, res) => {
    try {
        const { Number, assistantID } = req.body;
        console.log(req.body)
        const client = Twilio(process.env.TWILIO_ACC_ID, process.env.TWILIO_AUTHTOKEN);
        client.incomingPhoneNumbers.create({
            phoneNumber: Number,
            voiceUrl: 'http://demo.twilio.com/docs/voice.xml',
            smsUrl: 'http://demo.twilio.com/docs/sms.xml'
        })
        .then(incomingPhoneNumber => {
            console.log('Bought phone number with SID:', incomingPhoneNumber.phoneNumber)
            const options = {
                method: 'POST',
                headers: {
                Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
                'Content-Type': 'application/json'
                },
                body: `{"assistantId":"${process.env.DEFAULT_ASS_ID}",
                        "name":"",
                        "twilioAccountSid":"${process.env.TWILIO_ACC_ID}",
                        "twilioAuthToken":"${process.env.TWILIO_AUTHTOKEN}",
                        "twilioPhoneNumber":"${incomingPhoneNumber.phoneNumber}"}`
            };
            fetch('https://api.vapi.ai/phone-number/import', options)
                .then(response => response.json())
                .then(response => {
                    console.log('Response:', response);
                    res.status(200).send(
                        {
                            code: 200,
                            success: true,
                            data: response,
                            timestamp: Date.now(),
                            message: "Bought Numbers Response",
                        }
                    );})
                .catch(err => console.error(err));
        })
        .catch(error => console.error('Error buying phone number:', error));
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
        console.log(error)
    }
});

const getAssistantPhone = asyncHandler(async (req, res) =>{
    try{
        const options = {
            method: 'GET',
            headers: {Authorization: `Bearer ${process.env.VAPI_API_KEY}`}
          };
          fetch('https://api.vapi.ai/phone-number', options)
            .then(response => response.json())
            .then(response => {
                console.log('Response:', response);
                res.status(200).send(
                    {
                        code: 200,
                        success: true,
                        data: response,
                        timestamp: Date.now(),
                        message: "get Assistant Phone Response",
                    }
                );})
            .catch(err => console.error(err));

    }catch(error){
        res.status(500).json({ error: 'Server Error' });
        console.log(error)
    }
})
const inBound = asyncHandler(async (req, res) => {
    try{
        const { assistant, phone } = req.body
        const options = {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: `{"assistantId":"${assistant}",
                    "name":"${phone}"}
                  `
          };
          
          fetch(`https://api.vapi.ai/phone-number/${phone}`, options)
            .then(response => response.json())
            .then(response => {
                console.log('Response:', response);
                res.status(200).send(
                    {
                        code: 200,
                        success: true,
                        data: response,
                        timestamp: Date.now(),
                        message: "get Assistant Phone Response",
                    }
                );})
            .catch(err => console.error(err));
    }catch(error){
        res.status(500).json({ error: 'Server Error' });
        console.log(error)
    }
})

const callOutbound = asyncHandler(async (req, res)=> {
    try{
        const options = {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
          };
          console.log(options)
          fetch(`https://api.vapi.ai/call/phone`, options)
            .then(response => response.json())
            .then(response => {
                console.log('Response:', response);
                res.status(200).send(
                    {
                        code: 200,
                        success: true,
                        data: response,
                        timestamp: Date.now(),
                        message: "get Assistant Phone Response",
                    }
                );})
            .catch(err => console.error(err));
    }catch(error){
        res.status(500).json({ error: 'Server Error' });
        console.log(error)
    }
})

export { buyPhones, callOutbound, getAssistantPhone, getPhones, inBound };

