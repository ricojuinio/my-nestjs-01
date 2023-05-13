import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {

  private issuer = 'https://dev-dblqlkk5thtpy21n.us.auth0.com/'
  private audience = 'https://localhost:3000/courses'
  private publicKey = `-----BEGIN CERTIFICATE-----
MIIDHTCCAgWgAwIBAgIJK8M3fusoZroCMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNV
BAMTIWRldi1kYmxxbGtrNXRodHB5MjFuLnVzLmF1dGgwLmNvbTAeFw0yMzAxMDkw
MzA1MzBaFw0zNjA5MTcwMzA1MzBaMCwxKjAoBgNVBAMTIWRldi1kYmxxbGtrNXRo
dHB5MjFuLnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBAKojCMJ3uQ5jvXyITgjE+JqocQN++DejAF0JSqBb9g8xNYK0lM2qOnYHn9E7
3L11DbhEwyC3E1uGlWH9L4+KGZVZbfmBO4uGDMuZKffJjZ9bEuIQd/VpJT+FG2OC
EublJO2mBipC54TZJ7zkhF7doq5gKCICLy/pspbOLHQu7lP5YfsI/lSYKuwS7Pms
ZaK+yxjxkCUIFuh28k9TbQFQABt61vv7StGvQSGXIF1s046v5/UfmjXhlrAbMF/l
lFXsMyp5YumX6P17pxWtBpBPBp+SV+K3nci4RgoGpk/9eBg8FfKHjU8ZkJ38JLyr
fVpnG8ML1ZfhrejEN+/BC7KK5nUCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQULvQM3J1LtEMq2nai35txRPisn0swDgYDVR0PAQH/BAQDAgKEMA0G
CSqGSIb3DQEBCwUAA4IBAQBfCjHkYX06bNasHy/va0b9Ho+myKYQih+qo3PXv0p9
dcKXZubXLXS7FHtdML74xv9g8jcWkqXNzfwZZERj+jaiQ6R3zlYab6t4zPEv8xK+
RMDr9bTwxPzNbCGSG4T3M/nc52vFwLbRC9xWa4obLWabjlatUVATHV9NQz2q8ZbO
giGXE5ebYvdKQeIt6f2MeZtqMymaj0qOSgm3jI1uP3mL+02IkSfgb49W3eVlhLF0
C1SSGol0CtHLVRXrl+sNS36m5DbeqUAQklvWttvmvsIA0MqaHwElUwP/WPQ1/dv3
4AekFeAxj6hnQ5FLkCx28V5LVDIRWnJTJrl5gcFn2P/W
-----END CERTIFICATE-----`

  constructor(private jwtService: JwtService) {};

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractAuthToken(req);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token, 
        {
          publicKey: this.publicKey,
          issuer: this.issuer,
          audience: this.audience
        },
      );
      
      req['authData'] = payload;

    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractAuthToken(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
