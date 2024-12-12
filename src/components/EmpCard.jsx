import React from 'react';
import { useLocation } from 'react-router-dom';
import MapImage from '../assets/indiaMap.png'
import MLlogo from '../assets/ml_logo.png'
import facebook from '../assets/facebook.svg'
import instagram from '../assets/instagram.svg'
import linkedin from '../assets/linkedin.svg'
import qr from '../assets/QR.png'
import { Fab, CircularProgress } from '@mui/material';
import {
  BadgeRounded, ContactEmergencyRounded, PersonRounded, PhoneRounded, MailRounded, LocationCityRounded,
  AddIcCallRounded, FmdGoodRounded, SmsRounded, InfoRounded, LanguageRounded, BusinessRounded
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';

const API_URL = "http://192.168.1.168:3030/api"

const fetchEmployeeData = async (empId) => {
  const response = await fetch(`${API_URL}/e-visiting?empid=${empId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function EmployeeCard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const empId = searchParams.get('empid'); // Get the 'emp' query parameter
  const imageUrl = `http://192.168.1.18:3322/card?empid=${empId}`;

  const { data: employeeData, error, isLoading } = useQuery(
    {
      queryFn: () => fetchEmployeeData(empId),
      queryKey: ["employeeData", empId],
      staleTime: 300000,
      enabled: !!empId
    }
  );

  if (isLoading) return <div className='p-2'><CircularProgress color='primary' /></div>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!employeeData) return <p>No data available</p>;
  if (employeeData) {
    console.log(employeeData.data)
  }

  const handleSaveContact = () => {

    const vCardData = `
      BEGIN:VCARD
      VERSION:3.0
      FN:${employeeData.data.photo}
      TEL:${employeeData.data.contactNo}
      EMAIL:${employeeData.data.emailID}
      END:VCARD
    `.trim();

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${contactName.replace(" ", "_")}.vcf`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='card w-[100%] md:w-[60%] lg:w-[40%] h-full shadow-custom'>
        {/* bg-image-photo */}
        <div className="h-1/4 bg-[#848688] rounded-tl-xl rounded-tr-xl relative">
          <div className="w-full h-full overflow-hidden border-b-[0.5rem] border-b-[#848688]">
            <img
              src={MapImage}
              alt="Map Image"
              className="w-full h-full object-cover object-[0_40%] transform scale-110"
            />
          </div>

          <div className='flex justify-center'>
            <img
              src={employeeData.data.photo}
              alt="Profile Photo"
              className="rounded-[50%] w-[8.5rem] h-[8.5rem] absolute top-[70%] md:top-[80%] border-[0.5rem] shadow-xl border-[#B20000] object-cover"
            />
          </div>
        </div>

        {/* profile-content */}
        <div className="h-3/4 bg-[#335b86] shadow-custom">
          <div className='pt-[5rem] pb-[1rem]'>

            {/* name-designation */}
            <div className="title flex flex-col items-center justify-center">
              <img src={MLlogo} alt="ML Infomap" className='w-12 h-7' />
              <p className='text-2xl font-bold font-parkinsans text-white pt-1'>{employeeData.data.name}</p>
              <p className='text-md font-semibold font-parkinsans text-white pt-1'>{employeeData.data.designation}</p>
            </div>

            {/* links */}
            <div className="flex justify-center p-2 mt-2">
              <Fab
                size="small"
                color="primary"
                aria-label="contact"
                sx={{ m: 1 }}
                component="a"
                href={"tel:+91" + employeeData.data.contactNo}
              >
                <PhoneRounded />
              </Fab>
              <Fab
                size="small"
                color="primary"
                aria-label="sms"
                sx={{ m: 1 }}
                component="a"
                href={"sms:+91" + employeeData.data.contactNo}
              >
                <SmsRounded />
              </Fab>
              <Fab
                size="small"
                color="primary"
                aria-label="email"
                sx={{ m: 1 }}
                component="a"
                href={"mailto:" + employeeData.data.emailID}
              >
                <MailRounded />
              </Fab>
              <Fab
                size="small"
                color="primary"
                aria-label="location"
                sx={{ m: 1 }}
                component="a"
                href="https://www.google.com/maps/place/ML+Infomap+Pvt+Ltd/@28.5409908,77.1864363,15z/data=!4m6!3m5!1s0x390d1df04fffffff:0x207ec185babc0d76!8m2!3d28.5409908!4d77.1864363!16s%2Fg%2F1tjmc113?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FmdGoodRounded />
              </Fab>
            </div>

            {/* contact-card */}
            <div className="contact m-4 bg-white shadow-custom rounded-lg h-[20rem] p-2">
              <div className='flex items-start h-[10%] w-full mt-1'>
                <BadgeRounded color='primary' />
                <p className='text-lg px-2 font-parkinsans font-semibold tracking-tight text-[#b20000] pt-[1px]'>
                  Contact Details
                </p>
              </div>

              <div className='flex items-center h-[90%] w-full'>
                {/* QR */}
                <div className="qr w-[35%] px-2 flex flex-col justify-center items-center">
                  <img 
                  src={employeeData.data.qrcode} 
                  alt="QR Code" 
                  className='w-29 h-29' 
                  />
                  <Fab variant="extended" color='primary' size='small' sx={{ mt: 2 }} onClick={handleSaveContact}>
                    <AddIcCallRounded sx={{ mr: 1 }} fontSize='small' />
                    <p className='font-parkinsans text-[0.5rem] md:text-[0.7rem] font-semibold leading-tight md:leading-none tracking-tight'>Save to Contacts</p>
                  </Fab>
                </div>

                {/* details */}
                <div className="data w-[65%] p-2 flex flex-col break-all">
                  <div>
                    <p className='font-parkinsans text-[#848688] text-xs sm:text-sm font-semibold tracking-tight'>
                      EMPID
                    </p>
                    <div className="name flex items-center">
                      <ContactEmergencyRounded fontSize='small' color='primary' />
                      <p className='font-parkinsans text-xs sm:text-sm font-semibold tracking-tight px-1'>
                        {employeeData.data.empid}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className='font-parkinsans text-[#848688] text-xs sm:text-sm font-semibold tracking-tight mt-3'>
                      NAME
                    </p>
                    <div className="name flex items-center">
                      <PersonRounded fontSize='small' color='primary' />
                      <p className='font-parkinsans text-xs sm:text-sm font-semibold tracking-tight px-1'>
                        {employeeData.data.name}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className='font-parkinsans text-[#848688] text-xs sm:text-sm font-semibold tracking-tight mt-3'>
                      MOBILE
                    </p>
                    <div className="name flex items-center">
                      <PhoneRounded fontSize='small' color='primary' />
                      <p className='font-parkinsans text-xs sm:text-sm font-semibold tracking-tight px-1'>
                        +91 {employeeData.data.contactNo}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className='font-parkinsans text-[#848688] text-xs sm:text-sm font-semibold tracking-tight mt-3'>
                      MAIL
                    </p>
                    <div className="name flex items-center">
                      <MailRounded fontSize='small' color='primary' />
                      <p className='font-parkinsans text-xs sm:text-sm font-semibold tracking-tight px-1'>
                        {employeeData.data.emailID}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className='font-parkinsans text-[#848688] text-xs sm:text-sm font-semibold tracking-tight mt-3'>
                      COMPANY
                    </p>
                    <div className="name flex items-center">
                      <LocationCityRounded fontSize='small' color='primary' />
                      <p className='font-parkinsans text-xs sm:text-sm font-semibold tracking-tight px-1'>
                        ML Infomap Pvt Ltd
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* address */}
            <div className="address mx-4 mt-10 bg-white shadow-custom rounded-lg h-[13rem] p-2">
              <div className='flex items-center h-[10%] w-full mt-1'>
                <BusinessRounded color='primary' />
                <p className='text-lg px-2 font-parkinsans font-semibold tracking-tight text-[#b20000] pt-[1px]'>
                  Address
                </p>
              </div>
              <div className='flex flex-col justify-center'>
                <div className="data p-2 grid grid-cols-2 break-all">
                  <div className='pt-2'>
                    <div>
                      <p className='font-parkinsans text-[#848688] text-xs sm:text-sm font-semibold tracking-tight'>ADDRESS LINE 1</p>
                      <p className='font-parkinsans text-xs sm:text-sm font-semibold tracking-tight'>124, Block - A</p>
                    </div>
                    <div className='pt-2'>
                      <p className='font-parkinsans text-[#848688] text-xs sm:text-sm font-semibold tracking-tight'>STATE</p>
                      <p className='font-parkinsans text-xs sm:text-sm font-semibold tracking-tight'>New Delhi</p>
                    </div>
                  </div>

                  <div className='pt-2'>
                    <div>
                      <p className='font-parkinsans text-[#848688] text-xs sm:text-sm font-semibold tracking-tight'>ADDRESS LINE 2</p>
                      <p className='font-parkinsans text-xs sm:text-sm font-semibold tracking-tight'>Katwaria Sarai</p>
                    </div>
                    <div className='pt-2'>
                      <p className='font-parkinsans text-[#848688] text-xs sm:text-sm font-semibold tracking-tight'>PINCODE</p>
                      <p className='font-parkinsans text-xs sm:text-sm font-semibold tracking-tight'>110016</p>
                    </div>
                  </div>
                </div>
                <Fab
                  variant="extended"
                  color='primary'
                  size='small'
                  sx={{ mx: 1, my: 2 }}
                  component="a"
                  href="https://www.google.com/maps/place/ML+Infomap+Pvt+Ltd/@28.5409908,77.1864363,15z/data=!4m6!3m5!1s0x390d1df04fffffff:0x207ec185babc0d76!8m2!3d28.5409908!4d77.1864363!16s%2Fg%2F1tjmc113?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FmdGoodRounded sx={{ mr: 1 }} fontSize='small' />
                  <p className='font-parkinsans text-[0.5rem] md:text-[0.7rem] font-semibold leading-tight md:leading-none tracking-tight'>Locate On Map</p>
                </Fab>
              </div>
            </div>

            {/* decription-card */}
            <div className="description mx-4 mt-10 bg-white shadow-custom rounded-lg h-[12rem] p-2">
              <div className='flex items-center h-[10%] w-full mt-1'>
                <InfoRounded color='primary' />
                <p className='text-lg px-2 font-parkinsans font-semibold tracking-tight text-[#b20000] pt-[1px]'>
                  Description
                </p>
              </div>

              <div className='h-[90%] flex justify-center'>
                <p className='font-parkinsans text-xs sm:text-sm font-semibold tracking-tight px-1 mt-3 text-justify'>
                  ML Infomap is an Information Technology company specialising in GIS solutions, maps, data and apps. It designs, develops, deploys and supports spatial solutions, using multiple technologies like Cloud and Mobile, AI Machine Learning, remotely sensed images, spatial analytics, IoT integration and 3D visualisation. It was established in 1993 by GIS expert Dr Manosi Lahiri.
                </p>
              </div>
            </div>

            {/* social-media */}
            <div className="flex justify-center p-2 my-6">
              <Fab
                size="small"
                color="primary"
                aria-label="contact"
                sx={{ m: 1 }}
                component="a"
                href="https://mlinfomap.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LanguageRounded />
              </Fab>
              <Fab
                size="small"
                color="primary"
                aria-label="contact"
                sx={{ m: 1 }}
                component="a"
                href={employeeData.data.linkedin === 'N/A' ? "https://www.linkedin.com/" : employeeData.data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedin} alt="linkedin" className='w-5 h-5' />
              </Fab>
              <Fab
                size="small"
                color="primary"
                aria-label="contact"
                sx={{ m: 1 }}
                component="a"
                href={employeeData.data.instagram === 'N/A' ? "https://www.instagram.com/" : employeeData.data.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="linkedin" className='w-5 h-5' />
              </Fab>
              <Fab
                size="small"
                color="primary"
                aria-label="contact"
                sx={{ m: 1 }}
                component="a"
                href={employeeData.data.facebook === 'N/A' ? "https://www.facebook.com/" : employeeData.data.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="linkedin" className='w-5 h-5' />
              </Fab>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
