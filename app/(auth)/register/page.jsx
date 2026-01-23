'use client'
import Link from "next/link";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createUser } from "@/action/authaction";
import { useSearchParams } from "next/navigation";
export default function HomeSsjsSS() {
    const router = useRouter();
    const searchParams = useSearchParams();
      const ref = searchParams.get("ref");
    const [loadng, setloadng] = useState(false)
const [user, setuser] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    country: "",
    referralcode: ref || "",
    password: "",
    cpassword: "",
  })

useEffect(() => {
  // first: code to run initially
  const timeoutId = setTimeout(() => {
   setloadng(false)
    // put your 'first' logic here if it should run after delay
  }, 3000); // 3000ms = 3 seconds

  // cleanup function
  return () => {
    clearTimeout(timeoutId); // second: cancel timeout on unmount or dependency change
    console.log("Cleanup function called");
  };
}, [ ]);


const handlesubmit = (e)=>{
  setloadng(true)
  e.preventDefault();
if (user.password !== user.cpassword) {
   toast.error(`password mismatch`)
       setloadng(false)

  return  
}



createUser(user)
.then((e)=>{
console.log(e.error);
if (e.error) {
  toast.error(`{${e.error}}`)
    setloadng(false)
}else{
    setloadng(false)

  toast.error(`{${e.sucess}}`)
    
   document.cookie = `session=${JSON.stringify({ userId: e.user })}; path=/; max-age=86400`;
   router.push('/dashboard')
}
})
.catch((w)=>{
  toast.error(`error {${w}}`)

})
}

const handleChange = (e) => {
    const { name, value } = e.target;
console.log(user);

    setuser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="w-full h-full text-black flex flex-col">
    <span  className="flex w-full text-center flex-col">
<h1 className="text-2xl font-bold">💪 create an account </h1>
<h4 className="text-gray-600 text-[70%]"> Register to continue with claritycapital </h4>
    </span>
    <form onSubmit={handlesubmit} method="post"  className="w-full flex mt-[30px] gap-4 flex-col">
<span className="flex flex-row w-full  gap-4 max-ms:flex-col">
  
    <label htmlFor="FirstName" className="flex flex-col    text-left  ">
      <h1 className="flex text-xs text-gray-600">  First Name</h1>
      <input id="FirstName" type="text" required onChange={handleChange} name="fname" className="border-b-1 w-full hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400"  value={user.fname} />
    </label>
    
    <label htmlFor="LastName" className="flex flex-col    text-left  ">
      <h1 className="flex text-xs text-gray-600">  Last Name</h1>
      <input id="LastName" type="text" required onChange={handleChange} name="lname" className="w-full border-b-1 hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400"  value={user.lname} />
    </label>
</span>
<span className="flex flex-row w-full  gap-4 max-ms:flex-col">
  
    <label htmlFor="email" className="flex flex-col    text-left  ">
      <h1 className="flex text-xs text-gray-600">Email Address</h1>
      <input id="email" type="text" required onChange={handleChange} name="email" className="border-b-1 w-full hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400"  value={user.email} />
    </label>
    
    <label htmlFor="username" className="flex flex-col    text-left  ">
      <h1 className="flex text-xs text-gray-600">Username</h1>
      <input id="username" type="text" onChange={handleChange} name="username" className="w-full border-b-1 hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400"  value={user.username} />
    </label>
</span>
<span className="flex flex-row w-full  gap-4 max-ms:flex-col">
  
    <label htmlFor="email" className="flex flex-col    text-left  ">
      <h1 className="flex text-xs text-gray-600 capitalize">country</h1>
      
      <select onChange={handleChange} required name="country" class="w-full border-b-1 text-xs mt-2 hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400" autocomplete="country" id="country"  >
    <option>select country</option>
    <option value="AF">Afghanistan</option>
    <option value="AX">Åland Islands</option>
    <option value="AL">Albania</option>
    <option value="DZ">Algeria</option>
    <option value="AS">American Samoa</option>
    <option value="AD">Andorra</option>
    <option value="AO">Angola</option>
    <option value="AI">Anguilla</option>
    <option value="AQ">Antarctica</option>
    <option value="AG">Antigua and Barbuda</option>
    <option value="AR">Argentina</option>
    <option value="AM">Armenia</option>
    <option value="AW">Aruba</option>
    <option value="AU">Australia</option>
    <option value="AT">Austria</option>
    <option value="AZ">Azerbaijan</option>
    <option value="BS">Bahamas</option>
    <option value="BH">Bahrain</option>
    <option value="BD">Bangladesh</option>
    <option value="BB">Barbados</option>
    <option value="BY">Belarus</option>
    <option value="BE">Belgium</option>
    <option value="BZ">Belize</option>
    <option value="BJ">Benin</option>
    <option value="BM">Bermuda</option>
    <option value="BT">Bhutan</option>
    <option value="BO">Bolivia (Plurinational State of)</option>
    <option value="BA">Bosnia and Herzegovina</option>
    <option value="BW">Botswana</option>
    <option value="BV">Bouvet Island</option>
    <option value="BR">Brazil</option>
    <option value="IO">British Indian Ocean Territory</option>
    <option value="BN">Brunei Darussalam</option>
    <option value="BG">Bulgaria</option>
    <option value="BF">Burkina Faso</option>
    <option value="BI">Burundi</option>
    <option value="CV">Cabo Verde</option>
    <option value="KH">Cambodia</option>
    <option value="CM">Cameroon</option>
    <option value="CA">Canada</option>
    <option value="BQ">Caribbean Netherlands</option>
    <option value="KY">Cayman Islands</option>
    <option value="CF">Central African Republic</option>
    <option value="TD">Chad</option>
    <option value="CL">Chile</option>
    <option value="CN">China</option>
    <option value="CX">Christmas Island</option>
    <option value="CC">Cocos (Keeling) Islands</option>
    <option value="CO">Colombia</option>
    <option value="KM">Comoros</option>
    <option value="CG">Congo</option>
    <option value="CD">Congo, Democratic Republic of the</option>
    <option value="CK">Cook Islands</option>
    <option value="CR">Costa Rica</option>
    <option value="HR">Croatia</option>
    <option value="CU">Cuba</option>
    <option value="CW">Curaçao</option>
    <option value="CY">Cyprus</option>
    <option value="CZ">Czech Republic</option>
    <option value="CI">Côte d'Ivoire</option>
    <option value="DK">Denmark</option>
    <option value="DJ">Djibouti</option>
    <option value="DM">Dominica</option>
    <option value="DO">Dominican Republic</option>
    <option value="EC">Ecuador</option>
    <option value="EG">Egypt</option>
    <option value="SV">El Salvador</option>
    <option value="GQ">Equatorial Guinea</option>
    <option value="ER">Eritrea</option>
    <option value="EE">Estonia</option>
    <option value="SZ">Eswatini (Swaziland)</option>
    <option value="ET">Ethiopia</option>
    <option value="FK">Falkland Islands (Malvinas)</option>
    <option value="FO">Faroe Islands</option>
    <option value="FJ">Fiji</option>
    <option value="FI">Finland</option>
    <option value="FR">France</option>
    <option value="GF">French Guiana</option>
    <option value="PF">French Polynesia</option>
    <option value="TF">French Southern Territories</option>
    <option value="GA">Gabon</option>
    <option value="GM">Gambia</option>
    <option value="GE">Georgia</option>
    <option value="DE">Germany</option>
    <option value="GH">Ghana</option>
    <option value="GI">Gibraltar</option>
    <option value="GR">Greece</option>
    <option value="GL">Greenland</option>
    <option value="GD">Grenada</option>
    <option value="GP">Guadeloupe</option>
    <option value="GU">Guam</option>
    <option value="GT">Guatemala</option>
    <option value="GG">Guernsey</option>
    <option value="GN">Guinea</option>
    <option value="GW">Guinea-Bissau</option>
    <option value="GY">Guyana</option>
    <option value="HT">Haiti</option>
    <option value="HM">Heard Island and Mcdonald Islands</option>
    <option value="HN">Honduras</option>
    <option value="HK">Hong Kong</option>
    <option value="HU">Hungary</option>
    <option value="IS">Iceland</option>
    <option value="IN">India</option>
    <option value="ID">Indonesia</option>
    <option value="IR">Iran</option>
    <option value="IQ">Iraq</option>
    <option value="IE">Ireland</option>
    <option value="IM">Isle of Man</option>
    <option value="IL">Israel</option>
    <option value="IT">Italy</option>
    <option value="JM">Jamaica</option>
    <option value="JP">Japan</option>
    <option value="JE">Jersey</option>
    <option value="JO">Jordan</option>
    <option value="KZ">Kazakhstan</option>
    <option value="KE">Kenya</option>
    <option value="KI">Kiribati</option>
    <option value="KP">Korea, North</option>
    <option value="KR">Korea, South</option>
    <option value="XK">Kosovo</option>
    <option value="KW">Kuwait</option>
    <option value="KG">Kyrgyzstan</option>
    <option value="LA">Lao People's Democratic Republic</option>
    <option value="LV">Latvia</option>
    <option value="LB">Lebanon</option>
    <option value="LS">Lesotho</option>
    <option value="LR">Liberia</option>
    <option value="LY">Libya</option>
    <option value="LI">Liechtenstein</option>
    <option value="LT">Lithuania</option>
    <option value="LU">Luxembourg</option>
    <option value="MO">Macao</option>
    <option value="MK">Macedonia North</option>
    <option value="MG">Madagascar</option>
    <option value="MW">Malawi</option>
    <option value="MY">Malaysia</option>
    <option value="MV">Maldives</option>
    <option value="ML">Mali</option>
    <option value="MT">Malta</option>
    <option value="MH">Marshall Islands</option>
    <option value="MQ">Martinique</option>
    <option value="MR">Mauritania</option>
    <option value="MU">Mauritius</option>
    <option value="YT">Mayotte</option>
    <option value="MX">Mexico</option>
    <option value="FM">Micronesia</option>
    <option value="MD">Moldova</option>
    <option value="MC">Monaco</option>
    <option value="MN">Mongolia</option>
    <option value="ME">Montenegro</option>
    <option value="MS">Montserrat</option>
    <option value="MA">Morocco</option>
    <option value="MZ">Mozambique</option>
    <option value="MM">Myanmar (Burma)</option>
    <option value="NA">Namibia</option>
    <option value="NR">Nauru</option>
    <option value="NP">Nepal</option>
    <option value="NL">Netherlands</option>
    <option value="AN">Netherlands Antilles</option>
    <option value="NC">New Caledonia</option>
    <option value="NZ">New Zealand</option>
    <option value="NI">Nicaragua</option>
    <option value="NE">Niger</option>
    <option value="NG">Nigeria</option>
    <option value="NU">Niue</option>
    <option value="NF">Norfolk Island</option>
    <option value="MP">Northern Mariana Islands</option>
    <option value="NO">Norway</option>
    <option value="OM">Oman</option>
    <option value="PK">Pakistan</option>
    <option value="PW">Palau</option>
    <option value="PS">Palestine</option>
    <option value="PA">Panama</option>
    <option value="PG">Papua New Guinea</option>
    <option value="PY">Paraguay</option>
    <option value="PE">Peru</option>
    <option value="PH">Philippines</option>
    <option value="PN">Pitcairn Islands</option>
    <option value="PL">Poland</option>
    <option value="PT">Portugal</option>
    <option value="PR">Puerto Rico</option>
    <option value="QA">Qatar</option>
    <option value="RE">Reunion</option>
    <option value="RO">Romania</option>
    <option value="RU">Russian Federation</option>
    <option value="RW">Rwanda</option>
    <option value="BL">Saint Barthelemy</option>
    <option value="SH">Saint Helena</option>
    <option value="KN">Saint Kitts and Nevis</option>
    <option value="LC">Saint Lucia</option>
    <option value="MF">Saint Martin</option>
    <option value="PM">Saint Pierre and Miquelon</option>
    <option value="VC">Saint Vincent and the Grenadines</option>
    <option value="WS">Samoa</option>
    <option value="SM">San Marino</option>
    <option value="ST">Sao Tome and Principe</option>
    <option value="SA">Saudi Arabia</option>
    <option value="SN">Senegal</option>
    <option value="RS">Serbia</option>
    <option value="CS">Serbia and Montenegro</option>
    <option value="SC">Seychelles</option>
    <option value="SL">Sierra Leone</option>
    <option value="SG">Singapore</option>
    <option value="SX">Sint Maarten</option>
    <option value="SK">Slovakia</option>
    <option value="SI">Slovenia</option>
    <option value="SB">Solomon Islands</option>
    <option value="SO">Somalia</option>
    <option value="ZA">South Africa</option>
    <option value="GS">South Georgia and the South Sandwich Islands</option>
    <option value="SS">South Sudan</option>
    <option value="ES">Spain</option>
    <option value="LK">Sri Lanka</option>
    <option value="SD">Sudan</option>
    <option value="SR">Suriname</option>
    <option value="SJ">Svalbard and Jan Mayen</option>
    <option value="SE">Sweden</option>
    <option value="CH">Switzerland</option>
    <option value="SY">Syria</option>
    <option value="TW">Taiwan</option>
    <option value="TJ">Tajikistan</option>
    <option value="TZ">Tanzania</option>
    <option value="TH">Thailand</option>
    <option value="TL">Timor-Leste</option>
    <option value="TG">Togo</option>
    <option value="TK">Tokelau</option>
    <option value="TO">Tonga</option>
    <option value="TT">Trinidad and Tobago</option>
    <option value="TN">Tunisia</option>
    <option value="TR">Turkey (Türkiye)</option>
    <option value="TM">Turkmenistan</option>
    <option value="TC">Turks and Caicos Islands</option>
    <option value="TV">Tuvalu</option>
    <option value="UM">U.S. Outlying Islands</option>
    <option value="UG">Uganda</option>
    <option value="UA">Ukraine</option>
    <option value="AE">United Arab Emirates</option>
    <option value="GB">United Kingdom</option>
    <option value="US">United States</option>
    <option value="UY">Uruguay</option>
    <option value="UZ">Uzbekistan</option>
    <option value="VU">Vanuatu</option>
    <option value="VA">Vatican City Holy See</option>
    <option value="VE">Venezuela</option>
    <option value="VN">Vietnam</option>
    <option value="VG">Virgin Islands, British</option>
    <option value="VI">Virgin Islands, U.S</option>
    <option value="WF">Wallis and Futuna</option>
    <option value="EH">Western Sahara</option>
    <option value="YE">Yemen</option>
    <option value="ZM">Zambia</option>
    <option value="ZW">Zimbabwe</option>
</select>
          </label>
    
    <label htmlFor="referralcode" className="flex flex-col    text-left  ">
      <h1 className="flex text-xs text-gray-600">Referral Code </h1>
      <input id="referralcode " type="text" onChange={handleChange} name="referralcode" className="w-full border-b-1 hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400"  value={user.referralcode} />
    </label>
</span>
<span className="flex flex-row w-full  gap-4 max-ms:flex-col">
  
    <label htmlFor="password" className="flex flex-col    text-left  ">
      <h1 className="flex text-xs text-gray-600 capitalize">password</h1>
      
          <input id="password " required type="password" onChange={handleChange} name="password" className="w-full border-b-1 hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400"  value={user.password} />

          </label>
    
    <label htmlFor="cpassword" className="flex flex-col    text-left  ">
      <h1 className="flex text-xs text-gray-600 capitalize">confirm password </h1>
      <input id="cpassword " required type="password" onChange={handleChange} name="cpassword" className="w-full border-b-1 hover:border-b-green-600 focus:border-b-2 focus:border-b-green-600  outline-none border-b-gray-400"  value={user.cpassword} />
    </label>
</span>

  
<span className="flex  justify-between w-full ">
  <small className="flex gap-1 items-center text-center  px-4 text-xs items-center">
 <input type="checkbox" required name="" id="" />
<h3>I agree with Privacy and policy and terms & condition </h3>
  </small>

 
</span>

<button type="submit" disabled={loadng}  className={`uppercase w-full h-fit py-2 text-white rounded  text-xs cursor-pointer ${loadng ? '!bg-red-300' :'bg-gradient-to-l from-green-600 to-green-800 '}`}> {!loadng ? 'create Account ' :'loading...'}</button>
   
 
    
    <span className="flex justify-center items-center gap-1 text-center w-full text-xs">
      <p>Already have an account ? </p>
      <Link href={'/login'} className="text-green-800">Login</Link>
    </span>
    </form>
    </div>
  );
}
