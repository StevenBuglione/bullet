using System;
using System.Linq;
using System.Threading.Tasks;
using IdentityServerAspNetIdentity.Models;
using IdentityServerAspNetIdentity.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IdentityServerAspNetIdentity.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountController(UserManager<ApplicationUser> userManager)
        {
            this._userManager = userManager;
        }

        [HttpPost]
        public async Task<ResultVM> Register([FromBody] RegisterVM model)
        {
            if (ModelState.IsValid)
            {
                IdentityResult result = null;
                var user = await _userManager.FindByNameAsync(model.UserName);

                if (user != null)
                {
                    return new ResultVM
                    {
                        Status = Status.Error,
                        Message = "Invalid data",
                        Data = "<li>User already exists</li>"
                    };
                }

                user = new ApplicationUser
                {
                    Id = Guid.NewGuid().ToString(),
                    UserName = model.UserName,
                    Email = model.Email
                };

                result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    return new ResultVM
                    {
                        Status = Status.Success,
                        Message = "User Created",
                        Data = user
                    };
                }
                else
                {
                    var resultErrors = result.Errors.Select(e => "<li>" + e.Description + "</li>");
                    return new ResultVM
                    {
                        Status = Status.Error,
                        Message = "Invalid data",
                        Data = string.Join("", resultErrors)
                    };
                }
            }

            var errors = ModelState.Keys.Select(e => "<li>" + e + "</li>");
            return new ResultVM
            {
                Status = Status.Error,
                Message = "Invalid data",
                Data = string.Join("", errors)
            };
        }
    }

    }
