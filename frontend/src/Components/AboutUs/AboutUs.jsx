import React from 'react'
import './AboutUs.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import AboutUsBox from '../AboutUsBox/AboutUsBox'

export default function AboutUs() {
  return (
    <>
      <div className="about-us">
        <div className="container">
          <SectionHeader
            title={'How can we help you?'}
            desc={
              'Since the Sabzleran educational academy is a private academy'
            }
            btnTitle={''}
          />

          <div className="container">
            <div className="row">
              <AboutUsBox
                title={'Dedicated courses'}
                desc={'Provides support and high quality !'}
                icon={'copyright'}
              />

              <AboutUsBox
                title={'Dedicated courses'}
                desc={'Provides support and high quality !'}
                icon={'copyright'}
              />

              <AboutUsBox
                title={'Dedicated courses'}
                desc={'Provides support and high quality !'}
                icon={'copyright'}
              />

              <AboutUsBox
                title={'Dedicated courses'}
                desc={'Provides support and high quality !'}
                icon={'copyright'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
