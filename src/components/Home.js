import { useState } from 'react';
import data from '../data/db.json';

const Home = () => {
    let { user, product } = data;
    console.log(user);
    console.log(product);

    const [userData, setUserData] = useState({
        userName: '',
        password: ''
    });

    const loginHandler = () => {
        let { userName, password } = userData;
        for (let u of user) {
            if (u.userName === userName && u.password === password) {
                alert('로그인 성공');
                return;
            }
            alert('로그인 실패');
        }
    }
    return (
        <div>
            <h1>Home</h1>
            <h3>Welcome To My World</h3>
            <div className="col-7">
                <div className="card">
                    <div className="card-header">
                        Login
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="userName">User ID</label>
                                <input type="text" className="form-control" name="userName" id="userName" value={userData.userName} onChange={(e) => setUserData({ ...userData, userName: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="text" className="form-control" name="password" id="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-sm" onClick={loginHandler}>로그인</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {product.map((p, index) => {
                return (
                    <div key={index} className="card d-inline-block" style={{ "width": "18rem" }}>
                        <img src={p.productImg} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{p.productName}</h5>
                            <p className="card-text">{p.price + ' 달러'}</p>
                        </div>
                    </div>
                );
            })
            }
        </div>
    );
}
export default Home;