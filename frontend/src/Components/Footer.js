import React from 'react'
import img from './utils/heading.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faSuperpowers } from '@fortawesome/free-brands-svg-icons';
import { faInstagram, faGithub, } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import Contact from './utils/Contact';

export default function Footer() {
  const [displayContact, setDisplayContact] = React.useState(false);

  return (
    <>
      <div className="container">
        <div className="container">
          {
            displayContact ? <Contact setDisplayContact={setDisplayContact}/> : null
          }
          <div className="container myborder mt-3 footerSecond">
            <div>
              <img src={img} alt="Footer" />
            </div>

            <div className="row mt-2">
              <Link to='https://www.linkedin.com/in/sudhanshu-shekhar-7979b2214/' target='_blank' className="col linked"><FontAwesomeIcon icon={faLinkedinIn} /></Link>
              <Link to='https://www.instagram.com/anshuprajapati/' className="col inta"><FontAwesomeIcon icon={faInstagram} /></Link>
              <Link to='https://github.com/sudhanshuBHU/' className="col inta"><FontAwesomeIcon icon={faGithub} /></Link>
              <Link to='https://sudhanshubhu.github.io/myPortfolio_Sudhanshu/' className="col inta"><FontAwesomeIcon icon={faSuperpowers} /></Link>
            </div>
            <div className="container text-center">
              <button className='btn mb-1 footerbtn' onClick={()=>setDisplayContact(!displayContact)}> Contact us</button>
            </div>
            <div className=''>
              <Link to='/privacy' target='_blank'><p >Privacy & Policy</p></Link>
              <Link to='/terms' target='_blank'><p>Terms & Conditions</p></Link>
            </div>
            <div className="container mt-3">
              &copy; {new Date().getFullYear()} Pay-Turn
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
