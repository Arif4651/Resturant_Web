import Hero from '../components/Hero/Hero'
import ExperienceIntro from '../components/ExperienceIntro/ExperienceIntro'
import Marquee from '../components/Marquee/Marquee'
import SignatureDishes from '../components/SignatureDishes/SignatureDishes'
import RooftopExperience from '../components/RooftopExperience/RooftopExperience'
import DayNightTransition from '../components/DayNightTransition/DayNightTransition'
import Reviews from '../components/Reviews/Reviews'
import ReservationCTA from '../components/ReservationCTA/ReservationCTA'
import Location from '../components/Location/Location'
import SocialMoments from '../components/SocialMoments/SocialMoments'

export default function HomePage() {
  return (
    <div className="homepage">
      <Hero />
      <ExperienceIntro />
      <Marquee />
      <SignatureDishes />
      <RooftopExperience />
      <DayNightTransition />
      <Reviews />
      <ReservationCTA />
      <Location />
      <SocialMoments />
    </div>
  )
}
