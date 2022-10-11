import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';


export default function About() {
    return (
        <>
            <Paper elevation={3} sx={{ px: 12, py: 5, display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h5' fontWeight='bold' sx={{ my: 3, fontSize: '2rem' }}>What is this tool and what does it do?</Typography>
                <Typography variant='p' sx={{ mt: 3, lineHeight: 1.8, fontSize: '1.5rem' }}>
                    Publicis Search Intelligence helps make sense of search data from several large online platforms
                    such as Google, Youtube, and Amazon. Search data is one of the few (mostly)
                    uncontaminated, (mostly) free data sources out there and has been successfully
                    leveraged by different fields for some time now.
                    The tool collects and compares such data from multiple sources, offering a good overview of
                    the search landscape for a given topic. In addition to the
                    basic autocomplete suggestions, it enriches the data with different keyword modifiers - questions, comparisons,
                    prepositions, etc, providing a much richer context.

                </Typography>
                <Typography variant='p' sx={{ mt: 8, mb: 3, lineHeight: 1.8, fontSize: '1.5rem' }}>
                    In most modern websites, whenever you start typing something in the search bar,
                    you automatically get five to ten suggestions to help you out with your search.
                    Under the hood, the website is running some proprietary algorithm(s) to maximize
                    the relevance of its suggestions and provide the end user with a better search experience.
                    Although we don't know the exact parameters of these algorithms, popularity is definitely among
                    the top factors. So it's safe to assume that these suggestions largely reflect what most people search for.
                    Here's what Google has to say about it:
                </Typography>
                <Box sx={{ my: 5, display: 'flex', justifyContent: 'center' }}>
                    <iframe width="700" height="415" src="https://www.youtube.com/embed/us9tUY_yN7Y" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </Box>
                <Typography variant='p' sx={{ mt: 8, lineHeight: 1.8, fontSize: '1.5rem' }}>
                    And <Link href='https://about.instagram.com/blog/announcements/break-down-how-instagram-search-works'>here's another similarly sounding description</Link> of how their search works from Instagram.
                    Besides being essentially free, search data is also less prone to social-desirability bias as people have a strong incentive to tell the truth.
                    This is not a niche data source either. As of this writing there are over 60.000 research papers including the keyword <i>Google Trends</i> on <Link href='https://www.sciencedirect.com/search?qs=google%20trends.com'>sciencedirect.com</Link> alone.
                </Typography>
                <Typography variant='h5' fontWeight='bold' sx={{ mt: 8, fontSize: '2rem' }}>What can I do with the tool?</Typography>
                <Typography variant='p' sx={{ mt: 3, lineHeight: 1.8, fontSize: '1.5rem' }}>
                    When it comes to search data insights, the sky is the limit. Here are some examples:
                    <ul>
                        <li><b>Uncovering Trends: </b>Search suggestions are generally up-to-date with what everyone else is searching for</li>
                        <li><b>Consumer Insights: </b>Pain points, brand preferences, competitors</li>
                        <li><b>Keywords: </b>Keyword ideas for SEO, social listening search strings, etc </li>
                        <li><b>Content Ideas: </b> WIRED's autocomplete interviews have generated millions of views on YouTube piggybacking on Google search suggestions</li>
                    </ul>
                </Typography>
                <Divider/>
                <Typography variant='p' sx={{ mt: 8, lineHeight: 1.8, fontSize: '1.5rem' }}>
                    Additional resources:
                    <ul>
                        <li><Link href='https://searchlistening.com/blog/'>Some interesting use cases of Answer the Public</Link> </li>
                        <li><Link href='https://www.thinkwithgoogle.com/intl/en-cee/consumer-insights/consumer-trends/emotional-searches/'>Google Search Trends 2022</Link> </li>
                        <li><Link href='https://www.goodreads.com/en/book/show/28512671-everybody-lies'>Everybody Lies: Big Data, New Data, and What the Internet Can Tell Us About Who We Really Are </Link></li>
                        <li><Link href='https://www.warc.com/newsandopinion/news/share-of-search-can-predict-market-share/en-gb/44232'>Share of Search can predict market share</Link> (WARC, 2020)</li>
                        <li><Link href='https://www.bennettinstitute.cam.ac.uk/blog/using-google-data-policy-research/'>Using Google data for policy research</Link> (Bennet Institute for Public Policy, 2019)</li>
                    </ul>
                </Typography>
            </Paper>


        </>

    )
}