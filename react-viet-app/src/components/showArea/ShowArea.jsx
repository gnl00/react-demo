import './ShowArea.css'

function ShowArea() {
  return (
    <div className='ShowArea'>
      <div className='ShowArea-item ShowArea-top'>
        <div className='top-title'>this is title for topppppppppppppppppppp</div>
      </div>
      <div className='ShowArea-item ShowArea-center'>
        <div className='center-item show-data-list'>DataList DataList</div>
        <div className='center-item show-pagination'>Pagination Pagination Pagination Pagination Pagination</div>
      </div>
      <div className='ShowArea-item ShowArea-bottom'>bottom</div>
    </div>
  )
}

export default ShowArea;