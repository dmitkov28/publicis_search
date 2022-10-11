import { useState, createContext } from "react"
import CompareModeLayout from "../components/Keywords/Results/CompareModeLayout";
import SuggestionsFinder from "../components/Keywords/SuggestionsFinder";
import SpeedDial from "@mui/material/SpeedDial";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export const CompareModeContext = createContext()

export default function KeywordSearch() {
    const [compareMode, setCompareMode] = useState(false)
    const cache = {}

    return (

        <CompareModeContext.Provider value={{ compareMode, setCompareMode, cache }}>
            {
                compareMode
                    ? <>
                        <CompareModeLayout
                            left={<SuggestionsFinder />}
                            right={<SuggestionsFinder />}
                        >
                        </CompareModeLayout>
                        <SpeedDial
                            ariaLabel="Reset"
                            sx={{ position: 'fixed', bottom: 16, right: 16, height: '10', width: '20' }}
                            icon={<RestartAltIcon />}
                            onClick={() => setCompareMode(false)}
                        />
                    </>

                    : <SuggestionsFinder />
            }

        </CompareModeContext.Provider >
    )
}