import { Route, Routes } from 'react-router-dom'
import { Home, Login, Homepage, Tourongoing, Tourupcoming, Tourended, Contact, Intro, News, Search, DetailTour } from './container/Public';
import { Account, CreateMatch, CreateTeam, CreateTour, ManageMatch, ManageTeam, ManageTour, System, Guide, ManageAccount } from './container/System'
import { path } from './ultils/constant';

function App() {
  return (
    <div className="h-full w-full"> 
      <Routes>
        <Route path={path.HOME} element= {<Home />}>
          <Route path={'/*'} element= {<Homepage />}/>
          <Route path={path.LOGIN} element= {<Login />}/>
          <Route path={path.GIAI_DANG_DIEN_RA} element= {<Tourongoing />}/>
          <Route path={path.GIAI_SAP_KHOI_TRANH} element= {<Tourupcoming/>}/>
          <Route path={path.GIAI_DA_KET_THUC} element= {<Tourended/>}/>
          
          <Route path={path.LIEN_HE} element= {<Contact />}/>
          <Route path={path.GIOI_THIEU} element= {<Intro />}/>
          <Route path={path.TIN_TUC} element= {<News/>}/>
          <Route path={path.TIM_KIEM} element= {<Search/>}/>
          <Route path={path.GIAI_DAU__NAME__TOURID} element= {<DetailTour />}/>
        </Route>
      
        <Route path={path.SYSTEM} element= {<System />}>
          <Route path={path.HUONG_DAN} element= {<Guide />}/>
          <Route path={path.TAO_GIAI} element= {<CreateTour/>}/>
          <Route path={path.QUAN_LY_GIAI} element= {<ManageTour/>}/>
          <Route path={path.TAI_KHOAN} element= {<Account/>}/>
          <Route path={path.TAO_DOI} element= {<CreateTeam/>}/>
          <Route path={path.QUAN_LY_DOI} element= {<ManageTeam/>}/>
          <Route path={path.TAO_TRAN} element= {<CreateMatch/>}/>
          <Route path={path.QUAN_LY_TRAN} element= {<ManageMatch/>}/>
          <Route path={'quan-ly-tai-khoan'} element= {<ManageAccount/>}/>
        </Route>      

      </Routes>
    </div>
  );
}

export default App;

// 7 bg-primary