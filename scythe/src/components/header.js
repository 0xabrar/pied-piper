import React, { PureComponent } from 'react'
import { Image, Menu, Container } from 'semantic-ui-react'

const piedPiperLogo = `https://png.icons8.com/color/1600/pied-piper.png`;

class Header extends PureComponent {

    render() {

        return (
            <div>
                <Menu inverted borderless={true}>
                    <Menu.Item header>
                        <Image
                            size='mini'
                            src={piedPiperLogo}
                            style={{ marginRight: '1.0em' }}
                        />
                        PiedPiper
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item link>Logout</Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

export default Header;