import { gql } from "@apollo/client"
import client from "../../apollo/apolo-client"
import Hero from "@/components/sections/hero-tools"
import Justification from "@/components/sections/tools-archive-justification"
import CalculatorBmi from "@/components/moleculas/calculator-bmi"
import CalculatorHomaIr from "@/components/moleculas/calculator-homa-ir"
import Grid from "@/components/sections/tools-grid"
import Warning from "@/components/sections/tool-warning"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Media() {
  const { data } = await getData()
  return (
    <main>
      <Hero data={data.tools.heroTools} />
      <Justification data={data.tools.justificationTools}/>
      <Grid data={data.tools.gridTools}/>
      <Warning data={data.tools.alertTools}/>
    </main>
  )
}

async function getData() {
  const { data: { pageBy } } = await client.query({
    query: gql`
      query Pages {
        pageBy(id: "cG9zdDo5ODE=") {
          id
          tools {
            heroTools {
              title
              text
              image {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            justificationTools{
              title
              text
              illnesTiles{
                name
                icon{
                  altText
                  mediaItemUrl
                }
              }
            }
            gridTools{
              repeater : narzedzia{
                title
                illnes{
                  icon{
                    altText
                    mediaItemUrl
                  }
                  name
                }
                description : opisNarzedzia
                link{
                  title
                  url
                }
                image{
                  altText
                  mediaItemUrl
                  mediaDetails{
                    height
                    width
                  }
                }
              }
            }
            alertTools{
              title
              content
              link{
                url
                title
              }
            }
          }
        }
      }
    `
  }, { pollInterval: 500 })

  return {
    data: pageBy
  }
}