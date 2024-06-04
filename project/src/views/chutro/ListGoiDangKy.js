import React from 'react';
import { getAllGoiDangKyCallAPI } from '../../services/admin/ThinhService';
class ListGoiDangKy extends React.Component {
  state = {
    listGoiDangKy: []
  }
  hideLoader = () => console.log(1);;
  async componentDidMount() {
    let res = await getAllGoiDangKyCallAPI();
    if (res != null) {
      this.setState({
        listGoiDangKy: res
      })
    }
    console.log(res);
  }
  render() {
    let { listGoiDangKy } = this.state
    return (
      <>
        <div class="page-heading header-text">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <h3>Danh Sách Gói Đăng Kí</h3>
                <span class="breadcrumb"><a href="#">Chủ Trọ: </a>Nguyễn Gia Nghiêm </span>
              </div>
            </div>
          </div>
        </div>
        <div class="single-product section">
          <div class="container">
            <div class="row trending-box">
              {
                listGoiDangKy.length == 0 ? <div className='null'>rỗng</div> :
                  <div>
                    {listGoiDangKy && listGoiDangKy.length > 0 && listGoiDangKy.map((item, index) => {
                      return (
                        <div class="col-lg-12 col-md-6 align-self-center mb-30 trending-items col-md-6 ">
                          <div class="item">
                            <div class="down-content">
                            <h4>Gói Cho Thuê {item.soLuongPhongToiDa} Phòng {item.thoiHan} Tháng</h4>
                            <button className='btn btn-primary bbt' >Đăng Ký gói</button>
                            </div>
                           
                          </div>
                         
                        </div>
                        
                      )
                    })
                    }
                  </div>
              }
            </div>
          </div>
        </div>

      </>
    )
  }
}
export default ListGoiDangKy;